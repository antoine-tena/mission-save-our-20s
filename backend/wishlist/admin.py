from django.contrib import admin
from .models import WishlistItem

@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'initiator', 'price', 'is_favorite', 'created_at')
    list_filter = ('status', 'initiator', 'is_favorite')
    search_fields = ('title', 'link')
