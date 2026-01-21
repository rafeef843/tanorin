
import os
import sys
import django
import shutil
import re
from django.core.files import File

# Add project root to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tanorin_backend.settings')

django.setup()

from api.models import Product, ProductImage, Category

def get_number(filename):
    match = re.search(r'IMG_(\d+)', filename)
    if match:
        return int(match.group(1))
    return None

def import_groups():
    source_dir = os.path.join(os.path.dirname(__file__), '../categories-images1')
    if not os.path.isdir(source_dir):
        print(f"Directory not found: {source_dir}")
        return

    # Ensure a category exists
    category, created = Category.objects.get_or_create(
        slug='new-arrivals',
        defaults={
            'name_en': 'New Arrivals',
            'name_ar': 'وصل حديثاً',
            'image': 'categories/default.jpg' # generic placeholder
        }
    )
    if created:
        print("Created 'New Arrivals' category.")
    else:
        print(f"Using category: {category.name_en}")

    groups = [
        {
            'name': 'Imported Product (Group 1)',
            'range': (8715, 8730)
        },
        {
            'name': 'Imported Product (Group 2)',
            'range': (8732, 8739)
        },
        {
            'name': 'Imported Product (Group 3)',
            'range': (8822, 8834)
        }
    ]

    all_files = sorted([f for f in os.listdir(source_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])

    for g_idx, group in enumerate(groups, 1):
        start, end = group['range']
        group_files = []
        
        for f in all_files:
            num = get_number(f)
            if num is not None and start <= num <= end:
                group_files.append(f)
        
        if not group_files:
            print(f"No files found for Group {g_idx} ({start}-{end})")
            continue

        print(f"Processing Group {g_idx}: {len(group_files)} images found.")

        # Create Product
        product_name = f"Product Group {g_idx}"
        slug = f"product-group-{g_idx}"
        
        # Check if exists to avoid dupes or update
        product, created = Product.objects.get_or_create(
            slug=slug,
            defaults={
                'name_en': product_name,
                'name_ar': f"منتج {g_idx}",
                'category': category,
                'description_short_en': f"Imported collection group {g_idx}",
                'description_short_ar': f"مجموعة مستوردة {g_idx}",
                'description_long_en': "Automatically imported from batch images.",
                'description_long_ar': "تم الاستيراد تلقائياً من صور المجموعة.",
                'size_en': 'Standard',
                'size_ar': 'قياسي',
            }
        )
        
        if not created:
             print(f"Updating existing product: {product.name_en}")

        # Sort files to ensure order
        group_files.sort()

        # Main image is the first one
        main_img_filename = group_files[0]
        main_img_path = os.path.join(source_dir, main_img_filename)
        
        with open(main_img_path, 'rb') as f:
            product.main_image.save(main_img_filename, File(f), save=True)
            
        print(f"Set main image: {main_img_filename}")

        # Add Gallery Images (skipping first one if we only want it as main, 
        # but often it's nice to have it in gallery too or just the others.
        # User said "insert each group as one product with gallery". 
        # Usually that implies all images accessible. 
        # I'll add ALL images to gallery including the main one, or just the rest. 
        # Let's add the REST as gallery images to avoid duplication in some UI implementations,
        # but some UIs expect main image to NOT be in gallery list. 
        # I'll include the others as gallery images.
        
        # Clear existing gallery images to prevent duplicates on re-run
        product.gallery_images.all().delete()
        
        for img_file in group_files[1:]:
            img_path = os.path.join(source_dir, img_file)
            with open(img_path, 'rb') as f:
                pi = ProductImage(product=product)
                pi.image.save(img_file, File(f), save=True)
                # Order by sequence
                pi.order = get_number(img_file) or 0
                pi.save()
            print(f"Added gallery image: {img_file}")

    print("Import completed.")

if __name__ == "__main__":
    import_groups()
