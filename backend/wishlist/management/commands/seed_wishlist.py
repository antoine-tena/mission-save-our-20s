from typing import Any
from django.core.management.base import BaseCommand
from wishlist.models import WishlistItem

class Command(BaseCommand):
    help = 'Seeds the wishlist with initial examples'

    def handle(self, *args: Any, **options: Any) -> None:
        items = [
            {'title': 'Bivouac au Semnoz', 'status': 'DONE', 'initiator': 'BOTH', 'is_favorite': True},
            {'title': 'Voyage au Japon', 'status': 'IDEA', 'initiator': 'BOTH', 'is_favorite': True, 'price': 3000},
            {'title': 'Cours de danse', 'status': 'IN_PROGRESS', 'initiator': 'AMANI', 'is_favorite': False},
            {'title': 'Monter à l\'Aiguille du Midi', 'status': 'IDEA', 'initiator': 'ANTOINE', 'is_favorite': False},
        ]
        for item in items:
            WishlistItem.objects.get_or_create(**item)
        self.stdout.write(self.style.SUCCESS('Successfully seeded wishlist'))
