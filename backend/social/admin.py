from django.contrib import admin
from .models import Profile, SocialPost, FriendRequest, SavedLocation, RichPost, RichPostAttachment

class RichPostAttachmentInline(admin.TabularInline):
    model = RichPostAttachment
    extra = 1

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

@admin.register(SavedLocation)
class SavedLocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude', 'created_at')
    search_fields = ('name',)
    list_filter = ('created_at',)

@admin.register(RichPost)
class RichPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'event_date', 'event_time', 'location', 'created_at')
    list_filter = ('author', 'event_date', 'created_at')
    search_fields = ('title', 'caption', 'location')
    inlines = [RichPostAttachmentInline]
