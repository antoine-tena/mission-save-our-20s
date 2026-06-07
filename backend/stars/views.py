from rest_framework import viewsets, permissions
from .models import StargazingSpot
from .serializers import StargazingSpotSerializer

class StargazingSpotViewSet(viewsets.ModelViewSet):
    queryset = StargazingSpot.objects.all()
    serializer_class = StargazingSpotSerializer
    permission_classes = [permissions.IsAuthenticated]
