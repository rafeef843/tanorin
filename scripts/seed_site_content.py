
import os
import sys
import django
import json

# Add project root to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tanorin_backend.settings')

django.setup()

from api.models import SiteContent

# This script populates the database with the content currently hardcoded in src/data/content.js
# NOTE: This effectively duplicates the mapping logic.

# Manually mapped content matching the structure in src/data/content.js
content_data = {
    "header.home": {"en": "Home", "ar": "الرئيسية", "section": "Header"},
    "header.products": {"en": "Products", "ar": "المنتجات", "section": "Header"},
    "header.quality": {"en": "Quality", "ar": "الجودة", "section": "Header"},
    "header.exhibitions": {"en": "Exhibitions", "ar": "المعارض", "section": "Header"},
    "header.news": {"en": "News", "ar": "الأخبار", "section": "Header"},
    "header.about": {"en": "About", "ar": "عن تانورين", "section": "Header"},
    
    "hero.title": {"en": "Quality You", "ar": "جودة يمكنك", "section": "Home Hero"},
    "hero.titleHighlight": {"en": "Can Taste", "ar": "تذوقها", "section": "Home Hero"},
    "hero.description": {"en": "Experience the premium world of food trading where quality meets tradition in every single product we export globally.", "ar": "اكتشف عالماً متميزاً في تجارة الأغذية حيث تلتقي الجودة بالتقاليد في كل منتج نقوم بتصديره عالمياً.", "section": "Home Hero"},
    "hero.videoButton": {"en": "Watch Our Video", "ar": "شاهد الفيديو", "section": "Home Hero"},
    "hero.exploreButton": {"en": "Explore Catalog", "ar": "استكشف المنتجات", "section": "Home Hero"},
    
    "mission.subtitle": {"en": "Our Mission", "ar": "مهمتنا", "section": "Mission"},
    "mission.title": {"en": "Business Activities", "ar": "أنشطتنا التجارية", "section": "Mission"},
    "mission.description": {"en": "Tanorin is a leading force in global food trading, connecting premium producers with quality-conscious markets across four continents.", "ar": "تعد \"تانورين\" قوة رائدة في تجارة الأغذية العالمية، حيث تربط المنتجين المتميزين بالأسواق التي تهتم بالجودة عبر أربع قارات.", "section": "Mission"},
    
    "categories.title": {"en": "Featured Categories", "ar": "الفئات المميزة", "section": "Categories"},
    
    "products.subtitle": {"en": "Pantry Essentials", "ar": "أساسيات المطبخ", "section": "Products"},
    "products.title": {"en": "Featured Products", "ar": "المنتجات المختارة", "section": "Products"},
    "products.cta": {"en": "Explore Product", "ar": "عرض المنتج", "section": "Products"},
    
    "about.title": {"en": "Authentic Flavors, Global Standards.", "ar": "نكهات أصيلة، معايير عالمية.", "section": "About"},
    "about.description": {"en": "Since our inception, Tanorin has been dedicated to bridging the gap between local artisanal food production and the global market. We believe that everyone deserves access to high-quality, authentic ingredients. Our commitment to sustainability and fair trade is at the heart of everything we do.", "ar": "منذ تأسيسنا، كرست تانورين جهودها لسد الفجوة بين إنتاج الأغذية الحرفي المحلي والسوق العالمي. نؤمن بأن الجميع يستحق الوصول إلى مكونات أصلية عالية الجودة. التزامنا بالاستدامة والتجارة العادلة هو جوهر كل ما نقوم به.", "section": "About"},
    
    "exhibitions.subtitle": {"en": "Global Reach", "ar": "نطاق عالمي", "section": "Exhibitions"},
    "exhibitions.title": {"en": "Global Presence & Exhibitions", "ar": "التواجد العالمي والمعارض", "section": "Exhibitions"},
    "exhibitions.cta": {"en": "View Highlights", "ar": "شاهد المقتطفات", "section": "Exhibitions"},
    
    "news.subtitle": {"en": "Latest Updates", "ar": "آخر التحديثات", "section": "News"},
    "news.title": {"en": "News & Media", "ar": "الأخبار والميديا", "section": "News"},
    "news.viewAll": {"en": "View All News", "ar": "عرض كل الأخبار", "section": "News"},
    "news.readMore": {"en": "Read More", "ar": "اقرأ المزيد", "section": "News"},
    
    "footer.desc": {"en": "Excellence in food trading and distribution across the globe. We bring the best of the world to your table.", "ar": "التميز في تجارة وتوزيع المواد الغذائية في جميع أنحاء العالم. نجلب الأفضل في العالم إلى مائدتك.", "section": "Footer"},
    "footer.copyright": {"en": "© 2024 Tanorin Food Trading Co. All rights reserved.", "ar": "© ٢٠٢٤ شركة تانورين لتجارة المواد الغذائية. جميع الحقوق محفوظة.", "section": "Footer"},
    # Add more as needed...
}

def seed_content():
    print("Seeding Site Content...")
    for key, data in content_data.items():
        obj, created = SiteContent.objects.update_or_create(
            key=key,
            defaults={
                'text_en': data['en'],
                'text_ar': data['ar'],
                'section': data['section']
            }
        )
        action = "Created" if created else "Updated"
        print(f"{action}: {key}")
    
    print("Done seeding content.")

if __name__ == "__main__":
    seed_content()
