from django.db import models

class WishlistItem(models.Model):
    STATUS_CHOICES = [
        ('IDEA', 'Idée'),
        ('IN_PROGRESS', 'En cours'),
        ('DONE', 'Réalisé'),
    ]
    INITIATOR_CHOICES = [
        ('ANTOINE', 'Antoine'),
        ('AMANI', 'Amani'),
        ('BOTH', 'Ensemble'),
    ]
    
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='IDEA')
    initiator = models.CharField(max_length=20, choices=INITIATOR_CHOICES, default='BOTH')
    link = models.URLField(max_length=500, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_favorite', '-created_at']

    def __str__(self):
        return self.title
