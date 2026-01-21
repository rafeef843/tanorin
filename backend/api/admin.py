from django.contrib import admin
from .models import Category, Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_ar', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'category', 'size_en', 'is_featured', 'updated_at')
    list_filter = ('category', 'is_featured')
    search_fields = ('name_en', 'name_ar')
    prepopulated_fields = {'slug': ('name_en',)}
    inlines = [ProductImageInline]
    fieldsets = (
        ('Basic Info', {
            'fields': ('category', 'slug', 'is_featured')
        }),
        ('English Content', {
            'fields': ('name_en', 'description_short_en', 'description_long_en', 'size_en', 'highlights_en', 'specs_en', 'tag_en')
        }),
        ('Arabic Content', {
            'fields': ('name_ar', 'description_short_ar', 'description_long_ar', 'size_ar', 'highlights_ar', 'specs_ar', 'tag_ar')
        }),
        ('Visuals', {
            'fields': ('main_image', 'tag_color')
        }),
    )
