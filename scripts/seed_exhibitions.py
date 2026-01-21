
import os
import sys
import django
from datetime import date

# Add the project root to the python path
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tanorin_backend.settings')

django.setup()

from api.models import Exhibition
from django.core.files.base import ContentFile
import requests

def create_exhibition(title_en, title_ar, desc_en, desc_ar, loc_en, loc_ar, city_en, city_ar, start, booth, image_url):
    print(f"Creating {title_en}...")
    ex = Exhibition(
        title_en=title_en,
        title_ar=title_ar,
        description_en=desc_en,
        description_ar=desc_ar,
        location_en=loc_en,
        location_ar=loc_ar,
        city_en=city_en,
        city_ar=city_ar,
        start_date=start,
        booth_number=booth
    )
    
    # Download image (mock)
    try:
        response = requests.get(image_url)
        if response.status_code == 200:
            ex.image.save(f"{title_en.replace(' ', '_')}.jpg", ContentFile(response.content), save=False)
    except Exception as e:
        print(f"Failed to download image: {e}")

    ex.save()

def run():
    Exhibition.objects.all().delete()
    
    # Upcoming
    create_exhibition(
        "Gulfood 2025", "جلفود ٢٠٢٥",
        "Join us at the world's largest annual food & beverage trade exhibition. We will be unveiling our new organic spice collection.",
        "انضم إلينا في أكبر معرض تجاري سنوي للأغذية والمشروبات في العالم. سنكشف النقاب عن مجموعتنا الجديدة من التوابل العضوية.",
        "Dubai World Trade Centre", "مركز دبي التجاري العالمي",
        "Dubai, UAE", "دبي، الإمارات",
        date(2025, 2, 19),
        "Hall 3, Stand A45",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRi8eDbW2l1WWEA7yd8eubVi0H1m_98sQqTOSG1sjCMl7iJlVFkiV1IY1mmiGdHmR6AMPli7b5i356RN_chMtw9_PyYEj7-c2jivmttGQlQYLAuEerZfHT26hUanT9CKSfhactQ9KYbMs5rSXj3p3c8vYaDRNZJGEM3SUhgi-vQYJdn3463p53OBd0GSXc4Ty2co_-tWU0n2eUvXJjm-sCvzQt8eX3B2gqfjlnGjrnMohBoEAsqwiSaUHrPNI6dHIoUHU5_wSn_rU"
    )

    # Past
    create_exhibition(
        "SIAL Paris 2024", "سيال باريس ٢٠٢٤",
        "Celebrating 60 years of food innovation. We connected with over 300 new partners across Europe.",
        "الاحتفال بمرور 60 عاماً على الابتكار الغذائي. تواصلنا مع أكثر من 300 شريك جديد في جميع أنحاء أوروبا.",
        "Paris Nord Villepinte", "باريس نورد فيلبينت",
        "Paris, France", "باريس، فرنسا",
        date(2024, 10, 19),
        "Booth 5B-112",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDraTNGLGnjTRmwEz98FUDACwAKGlLcYluFno3aQJIyJ87cSDb64AtMYtrpjzMmHc2R2539Ed6Ul-MiRWIWFAEuXL6FtgR5ICr1AUuiUFwaFx3UbaIJ2cFxuBB1XjYL6cOdwAynNbMAC1VfHeko7g1ikOlBP1vjOCQgRCefg3Iqw33HRhS2mrSclVU9iNfY15iDXLGoE96PIAqN2ACP7gkswAUpYqtUd9g-o1G3RgZYAg3ne7bjJm04cfOBKxL1TgkO96rbh7u7KiU"
    )
    
    create_exhibition(
        "Anuga 2023", "أنوجا ٢٠٢٣",
        "The leading trade fair for the global food industry. Our sustainable sourcing initiative was a highlight.",
        "المعرض التجاري الرائد لصناعة الأغذية العالمية. كانت مبادرتنا للتوريد المستدام أبرز ما في المعرض.",
        "Koelnmesse", "كولنميس",
        "Cologne, Germany", "كولونيا، ألمانيا",
        date(2023, 10, 7),
        "Hall 11.2",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAXez0xtcEVXompfLooIRHxbAJC_8HxqS8ZfPq_gpJWjpZRS2-hHJ6PX_yUixOWNWGWHdyNVVoXYnJLBbgfZ7urHPHv6gdRTQl-PNHPY5ty22vAg51iUBMSZaoewM_H_khFNLQmxg1q3ZSPE7Jh4pBb8ilJeao2hp77Vujmltsi5bgE5J6psuCQw3IJaChro3dhvGvjHFzYKfTtTLgki3zSclVuJVnFS1vL7AdKAkBXJGWRkMxBl4RpFKHaoiLiwXEgwzNDhRiiQjE"
    )
    
    create_exhibition(
        "Gulfood 2023", "جلفود ٢٠٢٣",
        "A record-breaking year for Tanorin with the launch of our premium olive oil range.",
        "عام قياسي لتانورين مع إطلاق مجموعة زيت الزيتون الممتازة.",
        "Dubai World Trade Centre", "مركز دبي التجاري العالمي",
        "Dubai, UAE", "دبي، الإمارات",
        date(2023, 2, 20),
        "Sheikh Saeed Hall",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRi8eDbW2l1WWEA7yd8eubVi0H1m_98sQqTOSG1sjCMl7iJlVFkiV1IY1mmiGdHmR6AMPli7b5i356RN_chMtw9_PyYEj7-c2jivmttGQlQYLAuEerZfHT26hUanT9CKSfhactQ9KYbMs5rSXj3p3c8vYaDRNZJGEM3SUhgi-vQYJdn3463p53OBd0GSXc4Ty2co_-tWU0n2eUvXJjm-sCvzQt8eX3B2gqfjlnGjrnMohBoEAsqwiSaUHrPNI6dHIoUHU5_wSn_rU"
    )

if __name__ == '__main__':
    run()
