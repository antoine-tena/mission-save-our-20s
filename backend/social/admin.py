from django.contrib import admin
from .models import Profile, SocialPost, FriendRequest

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'friends_count')
    search_fields = ('user__username', 'bio')

    def friends_count(self, obj: Profile) -> int:
        return obj.friends.count()

@admin.register(SocialPost)
class SocialPostAdmin(admin.ModelAdmin):
    list_display = ('author', 'created_at', 'likes_count')
    list_filter = ('created_at', 'author')
    
    def likes_count(self, obj: SocialPost) -> int:
        return obj.likes.count()

@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('from_user', 'to_user', 'created_at', 'accepted')
    list_filter = ('accepted', 'created_at')
