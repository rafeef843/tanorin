from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, NewsArticleViewSet, ExhibitionViewSet, SiteContentViewSet, JobOpeningViewSet, JobApplicationViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'news', NewsArticleViewSet)
router.register(r'exhibitions', ExhibitionViewSet)
router.register(r'site-content', SiteContentViewSet)
router.register(r'jobs', JobOpeningViewSet)
router.register(r'applications', JobApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
