<template>
  <section class="profile-hero">
    <SocialProfileHeroCover :cover-url="profile?.cover_url" @edit="$emit('editCover')" />

    <div class="container hero-content-wrapper">
      <SocialProfileHeroInfo 
        :avatar-url="profile?.avatar_url" 
        :username="username" 
        :status="profile?.status" 
        :friends-count="profile?.friends_count || 0" 
        :posts-count="postsCount" 
        :points="profile?.points || 0"
        @edit-avatar="$emit('editAvatar')" 
        @edit-profile="$emit('editProfile')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Profile } from '~/types';
defineProps<{ profile: Profile | null; username: string | undefined; postsCount: number; }>();
defineEmits(['editCover', 'editAvatar', 'editProfile']);
</script>

<style scoped>
.profile-hero { background: white; border-bottom: 1px solid #dbdbdb; margin-bottom: 0; }
.hero-content-wrapper { max-width: 935px; margin: 0 auto; padding: 0 20px; }
</style>
