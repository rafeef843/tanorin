
import os
import sys
import django
import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.utils.text import slugify
from datetime import date

# Add project root to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tanorin_backend.settings')

django.setup()

from api.models import NewsArticle

def seed_specific_news():
    print("Seeding specific news article...")

    img_url = "https://lh3.googleusercontent.com/aida-public/AB6AXuAWD0bOd4LOClrDj1mPbntNhpp-w5JWQYOR0EG-pSmVDZ7Kg2JcEfKg5lAq_dSFkluFVnjmPPz-1iFHVMlmW7d1g_MUo9u3pP2Eq6L1Y6B8vRTgBeGexzuE9H_Vegwfa1OThh9gFZqry_S963RGKHP3QhPBr2PL8tXjIBmQZWkk4tqKrXddN7YfjEcPSB6OxBpj7NtslO4enXyI7Npfxvcjvohft6tBONgEpfAXd_iF-AmS6c-JD4Pc0-goJ4aa2rbnB8QQWjn7IWY"
    
    title_en = "Tanorin's Strategic Expansion into European Markets"
    title_ar = "توسع تانورين الاستراتيجي في الأسواق الأوروبية"
    
    slug = slugify(title_en)
    
    content_en = """We are thrilled to announce the opening of our new distribution hubs in Rotterdam and Hamburg, marking a significant milestone in our global growth strategy to bring authentic flavors to Europe.

In a move that solidifies Tanorin's commitment to global food security and premium supply chain management, our executive board has finalized the launch of two state-of-the-art logistics centers in the heart of Europe. These hubs represent more than just physical infrastructure; they are the gateway through which our diverse range of organic grains, spices, and pulses will reach thousands of retail partners across the continent.

By positioning ourselves in Rotterdam and Hamburg, we are effectively reducing lead times by up to 40% for our European clients. These locations were strategically chosen for their superior maritime connectivity and robust rail infrastructure, allowing for seamless distribution from the ports directly to central and northern Europe.

"Our expansion into Europe is a direct response to the growing demand for transparently sourced, high-quality agricultural products," says our CEO. "The Rotterdam facility will feature advanced climate-controlled warehousing specifically designed for our delicate spice varieties, ensuring they maintain their aroma and potency from the farm to the end consumer."

As with all Tanorin operations, sustainability remains at the forefront of this expansion. Both hubs are powered by 100% renewable energy and utilize AI-driven inventory management to minimize waste and optimize transport routes. This initiative aligns with our broader goal of achieving carbon neutrality across our logistics network by 2030."""

    content_ar = """يسعدنا أن نعلن عن افتتاح مراكز التوزيع الجديدة في روتردام وهامبورغ، مما يمثل علامة فارقة في استراتيجية نمونا العالمي لجلب النكهات الأصيلة إلى أوروبا.

في خطوة تعزز التزام تانورين بالأمن الغذائي العالمي وإدارة سلسلة التوريد المتميزة، أنهى مجلس إدارتنا إطلاق مركزين لوجستيين على أحدث طراز في قلب أوروبا. تمثل هذه المراكز أكثر من مجرد بنية تحتية مادية؛ إنها البوابة التي ستصل من خلالها مجموعتنا المتنوعة من الحبوب العضوية والتوابل والبقوليات إلى آلاف الشركاء التجاريين عبر القارة.

من خلال تمركزنا في روتردام وهامبورغ، فإننا نعمل بشكل فعال على تقليل المهل الزمنية بنسبة تصل إلى 40% لعملائنا الأوروبيين. تم اختيار هذه المواقع بشكل استراتيجي لتفوقها في الاتصال البحري والبنية التحتية القوية للسكك الحديدية، مما يسمح بالتوزيع السلس من الموانئ مباشرة إلى وسط وشمال أوروبا.

يقول رئيسنا التنفيذي: "توسعنا في أوروبا هو استجابة مباشرة للطلب المتزايد على المنتجات الزراعية عالية الجودة والمصدرة بشفافية. ستتميز منشأة روتردام بمستودعات متقدمة يتم التحكم في مناخها ومصممة خصيصًا لأنواع التوابل الحساسة لدينا، مما يضمن احتفاظها برائحتها وفعاليتها من المزرعة إلى المستهلك النهائي."

كما هو الحال مع جميع عمليات تانورين، تظل الاستدامة في طليعة هذا التوسع. يتم تشغيل كلا المركزين بالطاقة المتجددة بنسبة 100% ويستخدمان إدارة المخزون المدعومة بالذكاء الاصطناعي لتقليل الهدر وتحسين طرق النقل. تتماشى هذه المبادرة مع هدفنا الأوسع المتمثل في تحقيق الحياد الكربوني عبر شبكتنا اللوجستية بحلول عام 2030."""

    excerpt_en = "We are thrilled to announce the opening of our new distribution hubs in Rotterdam and Hamburg, marking a significant milestone in our global growth strategy."
    excerpt_ar = "يسعدنا أن نعلن عن افتتاح مراكز التوزيع الجديدة في روتردام وهامبورغ، مما يمثل علامة فارقة في استراتيجية نمونا العالمي."

    # Download image
    img_temp = NamedTemporaryFile(delete=True)
    img_temp.write(requests.get(img_url).content)
    img_temp.flush()

    article, created = NewsArticle.objects.get_or_create(
        slug=slug,
        defaults={
            'title_en': title_en,
            'title_ar': title_ar,
            'category': 'Announcements',
            'content_en': content_en,
            'content_ar': content_ar,
            'excerpt_en': excerpt_en,
            'excerpt_ar': excerpt_ar,
            'date_published': date(2024, 3, 15),
            'is_featured': True
        }
    )

    if created:
        article.image.save(f"{slug}.jpg", File(img_temp), save=True)
        print("Created article.")
    else:
        print("Article already exists. Updating content...")
        article.content_en = content_en
        article.content_ar = content_ar
        article.save()

    print("Done")

if __name__ == "__main__":
    seed_specific_news()
