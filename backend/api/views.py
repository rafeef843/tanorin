from rest_framework import viewsets
from .models import Category, Product, NewsArticle, Exhibition, SiteContent, JobOpening, JobApplication
from .serializers import CategorySerializer, ProductSerializer, NewsArticleSerializer, ExhibitionSerializer, SiteContentSerializer, JobOpeningSerializer, JobApplicationSerializer

class SiteContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteContent.objects.all()
    serializer_class = SiteContentSerializer
    
    # We might want to filter by section or return all.
    # Frontend will likely fetch ALL at once to populate the content cache.


class ExhibitionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Exhibition.objects.all()
    serializer_class = ExhibitionSerializer
    
    def get_queryset(self):
        queryset = Exhibition.objects.all()
        # Allow filtering by 'upcoming' or 'past' if needed via query params
        # But simple ordering is default via Meta
        return queryset

class NewsArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = NewsArticle.objects.all()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        
        if category:
            queryset = queryset.filter(category=category)
            
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
            
        return queryset

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Product.objects.all()
        category_slug = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
            
        return queryset

class JobOpeningViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobOpening.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = JobOpeningSerializer

class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    http_method_names = ['post']


