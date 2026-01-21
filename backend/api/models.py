from django.db import models

class Category(models.Model):
    name_en = models.CharField(max_length=100)
    name_ar = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories/')
    slug = models.SlugField(unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name_en

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name_en = models.CharField(max_length=200)
    name_ar = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=255)
    
    description_short_en = models.TextField(help_text="Short description for list view")
    description_short_ar = models.TextField()
    
    description_long_en = models.TextField(help_text="Detailed description paragraphs (can be markdown or split by newlines)")
    description_long_ar = models.TextField()
    
    size_en = models.CharField(max_length=100)
    size_ar = models.CharField(max_length=100)
    
    # JSON fields for structured data
    highlights_en = models.JSONField(default=list, help_text="List of strings")
    highlights_ar = models.JSONField(default=list)
    
    specs_en = models.JSONField(default=dict, help_text="Key-value pairs for specs")
    specs_ar = models.JSONField(default=dict)
    
    tag_en = models.CharField(max_length=50, blank=True, null=True)
    tag_ar = models.CharField(max_length=50, blank=True, null=True)
    tag_color = models.CharField(max_length=20, default='primary', help_text="Tailwind color class name suffix (e.g. 'primary', 'orange-500')")

    main_image = models.ImageField(upload_to='products/main/')
    
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name_en

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/gallery/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image for {self.product.name_en}"

class NewsArticle(models.Model):
    CATEGORY_CHOICES = [
        ('Exhibitions', 'Exhibitions'),
        ('Announcements', 'Announcements'),
        ('CSR', 'Corporate Social Responsibility'),
        ('Media', 'Media Highlights'),
    ]

    title_en = models.CharField(max_length=200)
    title_ar = models.CharField(max_length=200)
    
    slug = models.SlugField(unique=True)
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Announcements')
    
    content_en = models.TextField()
    content_ar = models.TextField()
    
    excerpt_en = models.TextField(help_text="Short summary for cards", blank=True)
    excerpt_ar = models.TextField(blank=True)
    
    image = models.ImageField(upload_to='news/')
    
    date_published = models.DateField()
    is_featured = models.BooleanField(default=False)
    
    video_url = models.URLField(blank=True, null=True, help_text="Optional video link for media highlights")
    video_duration = models.CharField(max_length=20, blank=True, null=True, help_text="e.g. '12:45 min'")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_published']

    def __str__(self):
        return self.title_en

class Exhibition(models.Model):
    title_en = models.CharField(max_length=200)
    title_ar = models.CharField(max_length=200)
    
    description_en = models.TextField()
    description_ar = models.TextField()
    
    location_en = models.CharField(max_length=200, help_text="e.g. Dubai World Trade Centre")
    location_ar = models.CharField(max_length=200)
    
    city_en = models.CharField(max_length=100, help_text="e.g. Dubai, UAE")
    city_ar = models.CharField(max_length=100)
    
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    
    booth_number = models.CharField(max_length=100, help_text="e.g. Hall 3, Stand A45", blank=True)
    
    image = models.ImageField(upload_to='exhibitions/')
    
    # Store map coordinates for the frontend map?
    # Simple x/y percentage on the map based on the design or lat/long?
    # The design uses "top: 50%, right: 38%" css positioning.
    # Let's add simple fields for map_top_percent and map_right_percent if needed, 
    # but for now, the user didn't explicitly ask for dynamic map dots, just the table/list. 
    # I will skip map coordinates to keep it simple unless needed.
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return self.title_en

class SiteContent(models.Model):
    key = models.CharField(max_length=255, unique=True, help_text="Dot notation key like 'home.hero.title'")
    text_en = models.TextField(blank=True, null=True)
    text_ar = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='site_content/', blank=True, null=True)
    
    # Optional: Grouping for dashboard organization
    section = models.CharField(max_length=100, blank=True, help_text="e.g. 'Header', 'Footer', 'Home Hero'")

    def __str__(self):
        return f"{self.key} ({self.section})"

    class Meta:
        verbose_name_plural = "Site Content"
