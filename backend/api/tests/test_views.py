from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Category, Product

class ProductAPITest(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name_en="Beverages",
            name_ar="مشروبات",
            slug="beverages"
        )
        self.product = Product.objects.create(
            category=self.category,
            name_en="Orange Juice",
            name_ar="عصير برتقال",
            slug="orange-juice",
            description_short_en="Fresh",
            description_short_ar="طازج",
            description_long_en="Very fresh",
            description_long_ar="طازج جدا",
            size_en="1L",
            size_ar="1 لتر"
        )

    def test_get_products_list(self):
        url = reverse('product-list')  # Default router name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name_en'], 'Orange Juice')

    def test_get_product_detail(self):
        url = reverse('product-detail', args=[self.product.slug])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name_en'], 'Orange Juice')

class CategoryAPITest(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name_en="Snacks",
            name_ar="وجبات خفيفة",
            slug="snacks"
        )

    def test_get_category_list(self):
        url = reverse('category-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name_en'], 'Snacks')
