from django.contrib import admin
from django.utils.html import format_html
from .models import Photo

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('titre', 'apercu', 'date_creation')
    list_filter = ('date_creation',)
    search_fields = ('titre', 'description')
    readonly_fields = ('apercu_detail',)

    fieldsets = (
        (None, {
            'fields': ('titre', 'description')
        }),
        ('Fichier', {
            'fields': ('image', 'apercu_detail')
        }),
        ('Métadonnées', {
            'fields': ('date_creation',),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('date_creation', 'apercu_detail')

    def apercu(self, obj: Photo) -> str:
        if obj.image:
            return format_html('<img src="{}" style="width: 50px; height: auto; border-radius: 4px;" />', obj.image.url)
        return "Aucun aperçu"
    apercu.short_description = 'Aperçu'

    def apercu_detail(self, obj: Photo) -> str:
        if obj.image:
            return format_html('<img src="{}" style="max-width: 300px; height: auto; border-radius: 8px;" />', obj.image.url)
        return "Aucun aperçu"
    apercu_detail.short_description = 'Aperçu de l\'image'
