from django.test import TestCase
from django.contrib.auth.models import User
from photos.models import Photo
from photos.serializers import PhotoSerializer

class PhotoPositionTestCase(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.photo = Photo.objects.create(
            author=self.user,
            titre="Test Position Photo",
            custom_x=120,
            custom_y=240,
            custom_width=300,
            custom_height=200
        )

    def test_photo_fields(self) -> None:
        """Test that custom positioning coordinates are successfully saved in DB."""
        photo = Photo.objects.get(id=self.photo.id)
        self.assertEqual(photo.custom_x, 120)
        self.assertEqual(photo.custom_y, 240)
        self.assertEqual(photo.custom_width, 300)
        self.assertEqual(photo.custom_height, 200)

    def test_photo_serializer(self) -> None:
        """Test that serializer correctly includes custom position fields."""
        serializer = PhotoSerializer(instance=self.photo)
        test_payload = serializer.data
        self.assertEqual(test_payload['custom_x'], 120)
        self.assertEqual(test_payload['custom_y'], 240)
        self.assertEqual(test_payload['custom_width'], 300)
        self.assertEqual(test_payload['custom_height'], 200)

    def test_photo_production_fields_and_active_url(self) -> None:
        """Test that production readiness fields (cloudinary_url, google_drive_url, is_archived) work correctly along with active_url property."""
        photo = Photo.objects.create(
            author=self.user,
            titre="Test URL Photo",
            cloudinary_url="https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg",
            google_drive_url="https://drive.google.com/file/d/sampleid/view",
            is_archived=False
        )
        self.assertEqual(photo.is_archived, False)
        self.assertEqual(photo.active_url, "https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg")

        photo.is_archived = True
        photo.save()
        
        updated_photo = Photo.objects.get(id=photo.id)
        self.assertEqual(updated_photo.is_archived, True)
        self.assertEqual(updated_photo.active_url, "https://drive.google.com/file/d/sampleid/view")
