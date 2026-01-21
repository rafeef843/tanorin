
import os
import sys
import django

# Add project root to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tanorin_backend.settings')

django.setup()

from api.models import Category, Product
from django.core.files import File

def update_category_images():
    # 1. Update "New Arrivals"
    try:
        cat_new = Category.objects.get(slug='new-arrivals')
        # Get the first product
        first_prod = cat_new.products.first()
        if first_prod and first_prod.main_image:
            # We want to use the same file. 
            # Since it's already in storage, we can point to it or duplicate it.
            # Pointing to it is easier but might be messy if product is deleted.
            # Let's duplicate it to the category folder to be safe.
            
            print(f"Updating New Arrivals image from product: {first_prod.name_en}")
            
            # Open the product image file
            with first_prod.main_image.open() as f:
                cat_new.image.save(os.path.basename(first_prod.main_image.name), File(f), save=True)
                
        else:
            print("No products found for New Arrivals to pick image from.")
            
    except Category.DoesNotExist:
        print("Category 'new-arrivals' not found.")

    # 2. Update "2024 Collection"
    try:
        cat_coll = Category.objects.get(slug='collection-2024')
        # Get a nice product (e.g. the 10th one for variety, or first)
        # Let's pick the first one
        first_prod = cat_coll.products.first()
        if first_prod and first_prod.main_image:
            print(f"Updating 2024 Collection image from product: {first_prod.name_en}")
            
            with first_prod.main_image.open() as f:
                cat_coll.image.save(os.path.basename(first_prod.main_image.name), File(f), save=True)
                
        else:
            print("No products found for 2024 Collection to pick image from.")
            
    except Category.DoesNotExist:
        print("Category 'collection-2024' not found.")

if __name__ == "__main__":
    update_category_images()
