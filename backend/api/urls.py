from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, NewsArticleViewSet, ExhibitionViewSet, SiteContentViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'news', NewsArticleViewSet)
router.register(r'exhibitions', ExhibitionViewSet)
router.register(r'site-content', SiteContentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
