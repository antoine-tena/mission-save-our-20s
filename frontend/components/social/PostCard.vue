<template>
  <article class="post-item glass-card">
    <div class="post-item-header">
      <img v-if="avatar" :src="avatar" class="small-avatar" />
      <div v-else class="small-avatar fallback-avatar-small">
        <Icon name="lucide:user" class="fallback-icon-small" />
      </div>
      <div class="post-meta">
        <span class="post-author">{{ post.author.username }}</span>
        <time class="post-time">{{ formatDate(post.created_at) }}</time>
      </div>
    </div>
    <p class="post-caption">{{ post.caption }}</p>
    <div class="post-media-box">
      <img :src="post.image_url" class="post-full-image" loading="lazy" />
    </div>
    <div class="post-interactions">
      <button class="interaction-btn" :class="{ 'liked': post.is_liked }" @click="$emit('like', post.id)">
        <Icon :name="post.is_liked ? 'lucide:heart' : 'lucide:heart'" class="icon" />
        {{ post.likes_count }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { SocialPost } from '~/types';
import { formatDate } from '~/utils/formatters';

defineProps<{
  post: SocialPost;
  avatar: string | null | undefined;
}>();

defineEmits<{
  (e: 'like', id: number): void;
}>();
</script>

<style scoped>
.glass-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  margin-bottom: 24px;
}

.post-item { padding: 0; overflow: hidden; }
.post-item-header { padding: 16px; display: flex; align-items: center; gap: 12px; }
.small-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.fallback-avatar-small { background: #fff0f9; color: #ca75d6; display: flex; align-items: center; justify-content: center; }
.fallback-icon-small { font-size: 1.1rem; }
.post-author { font-weight: 700; color: #1a202c; }
.post-time { font-size: 12px; color: #a0aec0; display: block; }
.post-caption { padding: 0 16px 12px; font-size: 15px; line-height: 1.5; color: #333; }
.post-media-box { background: #f8fafc; }
.post-full-image { width: 100%; display: block; }
.post-interactions { padding: 12px 16px; display: flex; gap: 20px; }

.interaction-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #718096;
  cursor: pointer;
  font-weight: 600;
}

.interaction-btn.liked { color: #f56565; }
</style>
