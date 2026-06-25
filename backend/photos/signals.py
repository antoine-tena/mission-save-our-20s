from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
from .models import Photo, Album
import os
from typing import Any, Type, Optional

@receiver(post_delete, sender=Photo)
def auto_delete_file_on_delete(sender: Type[Photo], instance: Photo, **kwargs: Any) -> None:
    """
    Supprime le fichier physique du disque quand l'objet Photo est supprimé de la BDD.
    """
    if instance.image:
        if os.path.isfile(instance.image.path):
            try:
                os.remove(instance.image.path)
            except Exception as e:
                print(f"Erreur lors de la suppression du fichier image: {e}")

@receiver(post_delete, sender=Album)
def auto_delete_cover_on_delete(sender: Type[Album], instance: Album, **kwargs: Any) -> None:
    """
    Supprime les fichiers physiques des couvertures quand l'Album est supprimé de la BDD.
    """
    for field in [instance.cover_photo, instance.back_cover_photo]:
        if field:
            if os.path.isfile(field.path):
                try:
                    os.remove(field.path)
                except Exception as e:
                    print(f"Erreur lors de la suppression de la couverture d'album: {e}")

@receiver(pre_save, sender=Photo)
def auto_delete_file_on_change(sender: Type[Photo], instance: Photo, **kwargs: Any) -> Optional[bool]:
    """
    Supprime l'ancien fichier s'il est remplacé par un nouveau.
    """
    if not instance.pk:
        return False

    try:
        old_file = Photo.objects.get(pk=instance.pk).image
    except Photo.DoesNotExist:
        return False

    new_file = instance.image
    if not old_file == new_file and old_file:
        if os.path.isfile(old_file.path):
            try:
                os.remove(old_file.path)
            except Exception:
                pass
    return None

@receiver(pre_save, sender=Album)
def auto_delete_cover_on_change(sender: Type[Album], instance: Album, **kwargs: Any) -> Optional[bool]:
    if not instance.pk:
        return False
    try:
        old_album = Album.objects.get(pk=instance.pk)
        old_cover = old_album.cover_photo
        old_back = old_album.back_cover_photo
    except Album.DoesNotExist:
        return False

    if old_cover and old_cover != instance.cover_photo:
        if os.path.isfile(old_cover.path):
            os.remove(old_cover.path)
            
    if old_back and old_back != instance.back_cover_photo:
        if os.path.isfile(old_back.path):
            os.remove(old_back.path)
    return None
