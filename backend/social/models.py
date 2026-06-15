from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.db.models.signals import post_save
from django.dispatch import receiver
import os
from typing import Any

def avatar_upload_path(profile_instance: 'Profile', filename: str) -> str:
    """Chemin d'upload pour l'avatar."""
    return os.path.join('avatars', str(profile_instance.user.id), filename)

def cover_upload_path(profile_instance: 'Profile', filename: str) -> str:
    """Chemin d'upload pour la photo de couverture."""
    return os.path.join('covers', str(profile_instance.user.id), filename)

def social_post_upload_path(post_instance: 'SocialPost', filename: str) -> str:
    """Chemin d'upload pour les images de publications sociales."""
    return os.path.join('social_posts', str(post_instance.author.id), filename)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    status = models.CharField(max_length=100, blank=True, default="En mission...")
    avatar = models.ImageField(
        upload_to=avatar_upload_path,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp'])]
    )
    cover_image = models.ImageField(
        upload_to=cover_upload_path,
        null=True,
        blank=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp'])]
    )
    friends = models.ManyToManyField('self', symmetrical=True, blank=True)
    points = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Profil"
        verbose_name_plural = "Profils"

    def __str__(self) -> str:
        return f"Profil de {self.user.username}"

@receiver(post_save, sender=User)
def create_user_profile(sender: Any, instance: User, created: bool, **kwargs: Any) -> None:
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender: Any, instance: User, **kwargs: Any) -> None:
    if hasattr(instance, 'profile'):
        instance.profile.save()

class SocialPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='social_posts')
    image = models.ImageField(
        upload_to=social_post_upload_path,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'])]
    )
    caption = models.TextField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Publication Sociale"
        verbose_name_plural = "Publications Sociales"

    def __str__(self) -> str:
        return f"Post de {self.author.username} ({self.created_at})"

    def save(self, *args: Any, **kwargs: Any) -> None:
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            profile, _ = Profile.objects.get_or_create(user=self.author)
            profile.points += 10
            profile.save(update_fields=['points'])

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_friend_requests')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_friend_requests')
    created_at = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)

    class Meta:
        unique_together = ('from_user', 'to_user')
        verbose_name = "Demande d'ami"
        verbose_name_plural = "Demandes d'ami"

    def __str__(self) -> str:
        return f"Demande d'ami de {self.from_user.username} à {self.to_user.username}"


def rich_post_upload_path(instance: 'RichPostAttachment', filename: str) -> str:
    """Chemin d'upload pour les fichiers de publications riches."""
    return os.path.join('rich_posts', str(instance.post.id), filename)


class RichPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rich_posts')
    title = models.CharField(max_length=255, blank=True, null=True)
    caption = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    event_date = models.DateField(blank=True, null=True)
    event_time = models.TimeField(blank=True, null=True)
    weather_info = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Publication Riche"
        verbose_name_plural = "Publications Riches"

    def __str__(self) -> str:
        return f"RichPost de {self.author.username} ({self.created_at})"


class RichPostAttachment(models.Model):
    FILE_TYPES = [
        ('IMAGE', 'Image'),
        ('VIDEO', 'Vidéo'),
        ('PDF', 'PDF'),
        ('OTHER', 'Autre'),
    ]
    post = models.ForeignKey(RichPost, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to=rich_post_upload_path)
    file_name = models.CharField(max_length=255, blank=True)
    file_type = models.CharField(max_length=20, choices=FILE_TYPES, default='OTHER')
    caption = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Fichier joint"
        verbose_name_plural = "Fichiers joints"

    def __str__(self) -> str:
        return f"Fichier {self.file_name} du post {self.post.id}"

