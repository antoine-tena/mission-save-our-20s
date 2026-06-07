from django.urls import path
from . import views

urlpatterns = [
    path('', views.photo_list_create, name='photo-list-create'),
    path('<int:pk>/', views.photo_detail_delete, name='photo-detail-delete'),
    path('health/', views.health_check, name='health-check'),
]
