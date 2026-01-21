
import os
import sys
import django
import random
from django.utils.text import slugify

# Add project root to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tanorin_backend.settings')

django.setup()

from api.models import Product, Category
from django.core.files import File

def import_social_products_v3():
    source_dir = os.path.join(os.path.dirname(__file__), '../groups')
    if not os.path.isdir(source_dir):
        print(f"Directory not found: {source_dir}")
        return

    # Create a specific category for these
    category, _ = Category.objects.get_or_create(
        slug='collection-2024',
        defaults={
            'name_en': '2024 Collection',
            'name_ar': 'مجموعة ٢٠٢٤',
            'image': 'categories/social_default.jpg'
        }
    )

    # Clean up previous import to avoid duplicates and remove filename-based products
    print(f"Deleting existing products in {category.name_en}...")
    Product.objects.filter(category=category).delete()

    descriptions = [
        {
            "en": "Experience the authentic taste of quality with this premium product. Perfectly sourced to ensure the highest standards.",
            "ar": "جرب الطعم الأصلي للجودة مع هذا المنتج المتميز. تم توفيره بعناية لضمان أعلى المعايير."
        },
        {
            "en": "A staple for every kitchen, bringing tradition and excellence to your table.",
            "ar": "منتج أساسي لكل مطبخ، يجلب التقاليد والتميز إلى مائدتك."
        },
        {
            "en": "Produced with care and passion, representing the finest in our collection.",
            "ar": "تم إنتاجه بعناية وشغف، ويمثل الأفضل في مجموعتنا."
        }
    ]

    files = sorted([f for f in os.listdir(source_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
    
    print(f"Found {len(files)} images. Re-importing with generic names...")

    for idx, filename in enumerate(files, 1):
        # Restore generic naming convention
        name_en = f"New Collection Item {idx}"
        name_ar = f"عنصر مجموعة جديد {idx}"
        slug = f"collection-item-{idx}"
        
        # Pick a random description
        desc = descriptions[idx % len(descriptions)]
        
        product = Product(
            slug=slug,
            name_en=name_en,
            name_ar=name_ar,
            category=category,
            description_short_en="New addition to our premium range.",
            description_short_ar="إضافة جديدة لمجموعتنا المتميزة.",
            description_long_en=desc['en'],
            description_long_ar=desc['ar'],
            size_en='Standard',
            size_ar='قياسي',
            is_featured=False
        )

        file_path = os.path.join(source_dir, filename)
        with open(file_path, 'rb') as f:
            product.main_image.save(filename, File(f), save=False)
            product.save()
            
        print(f"Created: {name_en}")

    print("Import Finished.")

if __name__ == "__main__":
    import_social_products_v3()
