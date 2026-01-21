from django.core.management.base import BaseCommand
from api.models import Category, Product, ProductImage
import json
import os
import requests
from django.core.files.base import ContentFile
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Import data from JSON file'

    def handle(self, *args, **kwargs):
        json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))), 'all_data.json')
        
        with open(json_path, 'r') as f:
            data = json.load(f)

        # 1. Import Categories
        # We use the structure from categoriesPageContent (data['categories'])
        # It has 'en' and 'ar' keys.
        
        categories_en = data['categories']['en']['categories']
        categories_ar = data['categories']['ar']['categories']
        
        # Helper to find matching Arabic item by index (assuming same order)
        # or by matching title roughly? Same order is safest for now as the data files were synchronous.
        
        for idx, cat_data_en in enumerate(categories_en):
            cat_data_ar = categories_ar[idx]
            
            title_en = cat_data_en['title']
            title_ar = cat_data_ar['title']
            
            # Create slug from English title
            slug = slugify(title_en)
            if slug == 'tomato-sauces-ketchup': # Manual fix to match current routes if needed
                 slug = 'tomato-sauces' 
            
            category, created = Category.objects.get_or_create(
                slug=slug,
                defaults={
                    'name_en': title_en,
                    'name_ar': title_ar,
                }
            )
            
            if created:
                self.stdout.write(f"Created Category: {title_en}")
                # Download Image
                img_url = cat_data_en['image']
                if img_url:
                    try:
                        resp = requests.get(img_url)
                        if resp.status_code == 200:
                            category.image.save(f"{slug}_cat.jpg", ContentFile(resp.content), save=True)
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Failed to download image for {title_en}: {e}"))
            else:
                 self.stdout.write(f"Category already exists: {title_en}")

            # 2. Import Products for this Category (if available in sample data)
            # Currently we only have "Tomato Sauces" populated in productListPageContent
            if 'tomato' in slug:
                self.import_products(data['productList'], data['productDetails'], category)

        # 3. Import Featured Products from Home Content
        self.import_featured_products(data['home'])

    def import_products(self, product_list_data, product_details_data, category):
        # Flatten products list
        products_en = product_list_data['en']['products']
        products_ar = product_list_data['ar']['products']
        
        # Details only exist for "Classic Tomato Ketchup" currently
        details_en = product_details_data['en']['product']
        details_ar = product_details_data['ar']['product']
        
        for idx, prod_en in enumerate(products_en):
            prod_ar = products_ar[idx]
            
            name_en = prod_en['name']
            name_ar = prod_ar['name']
            slug = slugify(name_en)
            
            # Check if we have details for this product
            # In the sample data, details are only for "Classic Tomato Ketchup"
            has_details = name_en == "Classic Tomato Ketchup"
            
            if has_details:
                desc_short_en = details_en['description1'] # Use first part as short
                desc_short_ar = details_ar['description1']
                
                desc_long_en = f"{details_en['description1']}\n\n{details_en['description2']}\n\n{details_en['description3']}"
                desc_long_ar = f"{details_ar['description1']}\n\n{details_ar['description2']}\n\n{details_ar['description3']}"
                
                highlights_en = details_en['highlights']['items']
                highlights_ar = details_ar['highlights']['items']
                
                specs_en = {k: v['value'] for k, v in details_en['specs'].items()}
                specs_ar = {k: v['value'] for k, v in details_ar['specs'].items()}
            else:
                # Use list page data if no detailed data
                desc_short_en = "Premium quality product."
                desc_short_ar = "منتج عالي الجودة."
                desc_long_en = desc_short_en
                desc_long_ar = desc_short_ar
                highlights_en = []
                highlights_ar = []
                specs_en = {}
                specs_ar = {}

            product, created = Product.objects.get_or_create(
                slug=slug,
                category=category,
                defaults={
                    'name_en': name_en,
                    'name_ar': name_ar,
                    'description_short_en': desc_short_en,
                    'description_short_ar': desc_short_ar,
                    'description_long_en': desc_long_en,
                    'description_long_ar': desc_long_ar,
                    'size_en': prod_en['size'],
                    'size_ar': prod_ar['size'],
                    'tag_en': prod_en.get('tag', None),
                    'tag_ar': prod_ar.get('tag', None),
                    'tag_color': prod_en.get('tagColor', 'primary'),
                    'highlights_en': highlights_en,
                    'highlights_ar': highlights_ar,
                    'specs_en': specs_en,
                    'specs_ar': specs_ar,
                    'is_featured': idx < 3 # Mark first few as featured for test
                }
            )
            
            if created:
                self.stdout.write(f"Created Product: {name_en}")
                # Main Image
                img_url = prod_en.get('image')
                if img_url:
                    try:
                        resp = requests.get(img_url)
                        if resp.status_code == 200:
                            product.main_image.save(f"{slug}_main.jpg", ContentFile(resp.content), save=True)
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Failed to download image for {name_en}: {e}"))
                
                # Gallery Images (only for detailed product)
                if has_details:
                     for i, gal_url in enumerate(details_en['images']):
                         try:
                             resp = requests.get(gal_url)
                             if resp.status_code == 200:
                                 ProductImage.objects.create(
                                     product=product,
                                     image=ContentFile(resp.content, name=f"{slug}_gallery_{i}.jpg"),
                                     order=i
                                 )
                         except Exception as e:
                             pass

    def import_featured_products(self, home_data):
        products_en = home_data['en']['products']['items']
        products_ar = home_data['ar']['products']['items']

        for idx, prod_en in enumerate(products_en):
            prod_ar = products_ar[idx]
            
            name_en = prod_en['name']
            name_ar = prod_ar['name']
            slug = slugify(name_en)
            
            # Try to assign to a category based on name keywords or create a "Featured" category if none fits
            category_slug = 'featured' # Default Fallback
            if 'Tomato' in name_en:
                category_slug = 'tomato-sauces'
            elif 'Halava' in name_en:
                 category_slug = 'halava-tahini'
            elif 'Oil' in name_en:
                category_slug = 'premium-oils'

            try:
                category = Category.objects.get(slug=category_slug)
            except Category.DoesNotExist:
                # Fallback to first one or create dummy
                category = Category.objects.first()

            product, created = Product.objects.get_or_create(
                slug=slug,
                defaults={
                    'category': category,
                    'name_en': name_en,
                    'name_ar': name_ar,
                    'description_short_en': prod_en.get('desc', ''),
                    'description_short_ar': prod_ar.get('desc', ''),
                    'description_long_en': prod_en.get('desc', ''),
                    'description_long_ar': prod_ar.get('desc', ''),
                    'size_en': 'Standard', # Home page products didn't have size in sample
                    'size_ar': 'قياسي',
                    'tag_en': prod_en.get('tag', None),
                    'tag_ar': prod_ar.get('tag', None),
                    'tag_color': prod_en.get('tagColor', 'primary'),
                    'is_featured': True
                }
            )
            
            if created:
                self.stdout.write(f"Created Featured Product: {name_en}")
                img_url = prod_en.get('image')
                if img_url:
                    try:
                        resp = requests.get(img_url)
                        if resp.status_code == 200:
                            product.main_image.save(f"{slug}_featured.jpg", ContentFile(resp.content), save=True)
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Failed to download image for {name_en}: {e}"))
            else:
                 # Update to be featured if it already existed
                 if not product.is_featured:
                     product.is_featured = True
                     product.save()
