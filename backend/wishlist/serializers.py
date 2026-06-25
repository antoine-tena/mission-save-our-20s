from rest_framework import serializers
from .models import WishlistItem

class WishlistItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishlistItem
        fields = ['id', 'title', 'status', 'initiator', 'link', 'price', 'is_favorite', 'created_at']
