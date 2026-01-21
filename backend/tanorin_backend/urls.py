from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Tanorin Backend is Running</h1><p>Go to <a href='/api/'>/api/</a> for API root.</p><p>Go to <a href='/admin/'>/admin/</a> for Dashboard.</p>")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', home),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
