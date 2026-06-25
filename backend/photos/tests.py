from django.test import TestCase
from django.contrib.auth.models import User
from unittest.mock import patch
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


class PhotoCloudinaryTestCase(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(username='clouduser', password='password123')

    @patch('os.environ.get')
    @patch('cloudinary.uploader.upload')
    def test_cloudinary_upload_on_save(self, mock_upload, mock_env_get) -> None:
        from django.core.files.uploadedfile import SimpleUploadedFile
        from unittest.mock import patch
        
        # Configure mock env and return value
        mock_env_get.side_effect = lambda key, default=None: "cloudinary://test_key:test_secret@test_cloud" if key == "CLOUDINARY_URL" else default
        mock_upload.return_value = {"secure_url": "https://res.cloudinary.com/test_cloud/image/upload/v123/mso20s/photos/image.jpg"}

        # Create dummy image file (1x1 transparent GIF)
        small_gif = (
            b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
            b'\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
            b'\x02\x4c\x01\x00\x3b'
        )
        dummy_file = SimpleUploadedFile("image.gif", small_gif, content_type="image/gif")

        photo = Photo.objects.create(
            author=self.user,
            titre="Cloudinary Upload Test",
            image=dummy_file
        )

        # Assert uploader was called and cloudinary_url set
        mock_upload.assert_called_once()
        self.assertEqual(photo.cloudinary_url, "https://res.cloudinary.com/test_cloud/image/upload/v123/mso20s/photos/image.jpg")
        
        # Test transformed thumbnail url
        self.assertEqual(photo.transformed_thumbnail_url, "https://res.cloudinary.com/test_cloud/image/upload/w_400,h_400,c_fill,q_auto,f_auto/v123/mso20s/photos/image.jpg")

