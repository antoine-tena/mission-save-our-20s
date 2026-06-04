"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from photos.views import photo_list_create, health_check, photo_detail_delete
from . import auth_views

urlpatterns = [
    path('', auth_views.root_view),
    path('admin/', admin.site.urls),
    path('api/auth/register/', auth_views.register),
    path('api/auth/login/', auth_views.login),
    path('api/auth/logout/', auth_views.logout),
    path('api/auth/me/', auth_views.get_user),
    path('api/photos/', photo_list_create),
    path('api/photos/<int:pk>/', photo_detail_delete),
    path('api/health/', health_check),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
