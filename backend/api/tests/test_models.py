from django.test import TestCase
from api.models import Category, Product, NewsArticle, Exhibition
from datetime import date

class CategoryModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name_en="Test Category",
            name_ar="فئة تجريبية",
            slug="test-category"
        )

    def test_category_str(self):
        self.assertEqual(str(self.category), "Test Category")

class ProductModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name_en="Food",
            name_ar="طعام",
            slug="food"
        )
        self.product = Product.objects.create(
            category=self.category,
            name_en="Tomato Paste",
            name_ar="معجون طماطم",
            slug="tomato-paste",
            description_short_en="Tasty",
            description_short_ar="لذيذ",
            description_long_en="Very tasty",
            description_long_ar="لذيذ جدا",
            size_en="500g",
            size_ar="500غ",
            is_featured=True
        )

    def test_product_creation(self):
        self.assertEqual(self.product.name_en, "Tomato Paste")
        self.assertTrue(self.product.is_featured)
        self.assertEqual(self.product.category.name_en, "Food")

    def test_product_str(self):
        self.assertEqual(str(self.product), "Tomato Paste")

class NewsArticleModelTest(TestCase):
    def setUp(self):
        self.article = NewsArticle.objects.create(
            title_en="Big News",
            title_ar="أخبار كبيرة",
            slug="big-news",
            content_en="Content here",
            content_ar="محتوى هنا",
            date_published=date.today()
        )

    def test_news_str(self):
        self.assertEqual(str(self.article), "Big News")

class ExhibitionModelTest(TestCase):
    def setUp(self):
        self.exhibition = Exhibition.objects.create(
            title_en="Expo 2026",
            title_ar="اكسبو 2026",
            location_en="Dubai",
            location_ar="دبي",
            city_en="Dubai",
            city_ar="دبي",
            start_date=date.today()
        )

    def test_exhibition_str(self):
        self.assertEqual(str(self.exhibition), "Expo 2026")
