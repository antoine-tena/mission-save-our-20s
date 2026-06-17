from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import RichPost


class RichPostAPITests(APITestCase):
    def setUp(self) -> None:
        self.user1 = User.objects.create_user(username="antoine", password="password123")
        self.user2 = User.objects.create_user(username="amani", password="password123")
        
        self.post = RichPost.objects.create(
            author=self.user1,
            title="My Awesome Post",
            caption="This is a caption",
            location="Paris",
        )

    def test_get_rich_post_detail(self) -> None:
        self.client.force_authenticate(user=self.user1)
        response = self.client.get(f"/api/social/journal/{self.post.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "My Awesome Post")
        self.assertEqual(response.data["likes_count"], 0)
        self.assertEqual(response.data["is_liked_by_me"], False)
        self.assertEqual(response.data["is_bookmarked_by_me"], False)

    def test_patch_rich_post_by_author(self) -> None:
        self.client.force_authenticate(user=self.user1)
        data = {
            "title": "My Updated Post",
            "caption": "Updated caption",
            "location": "Lyon"
        }
        response = self.client.patch(f"/api/social/journal/{self.post.id}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, "My Updated Post")
        self.assertEqual(self.post.caption, "Updated caption")
        self.assertEqual(self.post.location, "Lyon")

    def test_patch_rich_post_by_non_author_forbidden(self) -> None:
        self.client.force_authenticate(user=self.user2)
        data = {
            "title": "Should fail",
        }
        response = self.client.patch(f"/api/social/journal/{self.post.id}/", data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, "My Awesome Post")

    def test_delete_rich_post_by_author(self) -> None:
        self.client.force_authenticate(user=self.user1)
        response = self.client.delete(f"/api/social/journal/{self.post.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(RichPost.objects.filter(id=self.post.id).exists())

    def test_delete_rich_post_by_non_author_forbidden(self) -> None:
        self.client.force_authenticate(user=self.user2)
        response = self.client.delete(f"/api/social/journal/{self.post.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(RichPost.objects.filter(id=self.post.id).exists())

    def test_like_unlike_toggle(self) -> None:
        self.client.force_authenticate(user=self.user1)
        
        # Like
        response = self.client.post(f"/api/social/journal/{self.post.id}/like/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "liked")
        self.assertEqual(response.data["likes_count"], 1)
        
        # Verify in serializer
        get_response = self.client.get(f"/api/social/journal/{self.post.id}/")
        self.assertTrue(get_response.data["is_liked_by_me"])
        self.assertEqual(get_response.data["likes_count"], 1)
        
        # Unlike
        response = self.client.post(f"/api/social/journal/{self.post.id}/like/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "unliked")
        self.assertEqual(response.data["likes_count"], 0)
        
        # Verify in serializer again
        get_response = self.client.get(f"/api/social/journal/{self.post.id}/")
        self.assertFalse(get_response.data["is_liked_by_me"])
        self.assertEqual(get_response.data["likes_count"], 0)

    def test_bookmark_toggle(self) -> None:
        self.client.force_authenticate(user=self.user1)
        
        # Bookmark
        response = self.client.post(f"/api/social/journal/{self.post.id}/bookmark/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "bookmarked")
        self.assertEqual(response.data["is_bookmarked"], True)
        
        # Verify in serializer
        get_response = self.client.get(f"/api/social/journal/{self.post.id}/")
        self.assertTrue(get_response.data["is_bookmarked_by_me"])
        
        # Unbookmark
        response = self.client.post(f"/api/social/journal/{self.post.id}/bookmark/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "unbookmarked")
        self.assertEqual(response.data["is_bookmarked"], False)
        
        # Verify in serializer again
        get_response = self.client.get(f"/api/social/journal/{self.post.id}/")
        self.assertFalse(get_response.data["is_bookmarked_by_me"])
