from django.test import TestCase
from django.contrib.auth.models import User
from photos.models import Photo
from photos.serializers import PhotoSerializer

class PhotoPositionTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.photo = Photo.objects.create(
            author=self.user,
            titre="Test Position Photo",
            custom_x=120,
            custom_y=240,
            custom_width=300,
            custom_height=200
        )

    def test_photo_fields(self):
        """Test that custom positioning coordinates are successfully saved in DB."""
        photo = Photo.objects.get(id=self.photo.id)
        self.assertEqual(photo.custom_x, 120)
        self.assertEqual(photo.custom_y, 240)
        self.assertEqual(photo.custom_width, 300)
        self.assertEqual(photo.custom_height, 200)

    def test_photo_serializer(self):
        """Test that serializer correctly includes custom position fields."""
        serializer = PhotoSerializer(instance=self.photo)
        data = serializer.data
        self.assertEqual(data['custom_x'], 120)
        self.assertEqual(data['custom_y'], 240)
        self.assertEqual(data['custom_width'], 300)
        self.assertEqual(data['custom_height'], 200)
