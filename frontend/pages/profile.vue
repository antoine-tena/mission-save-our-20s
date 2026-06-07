<template>
  <div class="social-profile-view">
    <SocialProfileHero 
      :profile="profile" :username="user?.username" :posts-count="posts.length"
      @edit-cover="triggerInput(coverInput)" @edit-avatar="triggerInput(avatarInput)" @edit-profile="activeTab = 'info'"
    />
    <input ref="coverInput" type="file" class="hidden" accept="image/*" @change="onFileChange($event, 'cover_image')" />
    <input ref="avatarInput" type="file" class="hidden" accept="image/*" @change="onFileChange($event, 'avatar')" />

    <div class="container profile-grid-layout">
      <main class="profile-main-content">
        <SocialProfileTabs v-model:activeTab="activeTab" />

        <div class="tab-content-area">
          <Transition name="fade-slide" mode="out-in">
            <div v-if="activeTab === 'posts'" key="posts" class="posts-section">
              <SocialPostCreator 
                v-model:caption="newPostCaption" :avatar="profile?.avatar_url" 
                :preview="newPostPreview" :has-file="!!newPostFile" :is-submitting="isSubmittingPost" 
                @file-change="onPostFile" @remove-file="clearPostFile" @submit="submitPost" 
              />
              <SocialPostGrid :posts="posts" @select="selectedPost = $event" />
            </div>
            <SocialSidebarBio 
              v-else-if="activeTab === 'info'" key="info"
              :points="profile?.points || 0" :bio="profile?.bio || ''" :status="profile?.status || ''"
              :is-editing="isEditingBio" @start-edit="isEditingBio = true" @save-bio="save('bio', $event)" @save-status="save('status', $event)"
            />
          </Transition>
        </div>
      </main>
    </div>

    <!-- Simple Post Detail Modal -->
    <div v-if="selectedPost" class="post-modal" @click.self="selectedPost = null">
      <div class="modal-card glass-card">
        <SocialPostCard :post="selectedPost" :avatar="profile?.avatar_url" @like="likePost" />
        <button class="close-modal" @click="selectedPost = null">
          <Icon name="lucide:x" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { SocialPost } from '~/types';

const { user } = useAuth();
const { profile, posts, fetchProfile, updateProfile, fetchPosts, createPost, likePost } = useSocial();

const activeTab = ref('posts'); const isEditingBio = ref(false); 
const coverInput = ref<HTMLInputElement>(); const avatarInput = ref<HTMLInputElement>();
const newPostCaption = ref(''); const newPostFile = ref<File | null>(null); 
const newPostPreview = ref<string | null>(null); const isSubmittingPost = ref(false);
const selectedPost = ref<SocialPost | null>(null);

onMounted(() => Promise.all([fetchProfile(), fetchPosts(user.value?.username)]));

const triggerInput = (el?: HTMLInputElement) => el?.click();
const onFileChange = (e: Event, key: string) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) { const fd = new FormData(); fd.append(key, file); updateProfile(fd); }
};
const save = async (key: string, val: string) => { const fd = new FormData(); fd.append(key, val); await updateProfile(fd); isEditingBio.value = false; };
const onPostFile = (e: Event) => { const file = (e.target as HTMLInputElement).files?.[0]; if (file) { newPostFile.value = file; newPostPreview.value = URL.createObjectURL(file); } };
const clearPostFile = () => { newPostFile.value = null; newPostPreview.value = null; };
const submitPost = async () => {
  if (!newPostFile.value) return; isSubmittingPost.value = true;
  const fd = new FormData(); fd.append('image', newPostFile.value); fd.append('caption', newPostCaption.value);
  if (await createPost(fd)) { newPostCaption.value = ''; clearPostFile(); if (profile.value) profile.value.points += 10; fetchPosts(user.value?.username); }
  isSubmittingPost.value = false;
};

useSeoMeta({ title: 'Mon Profil — MSO20s' });
</script>

<style scoped>
.social-profile-view { min-height: 100vh; background: #fafafa; padding-bottom: 4rem; }
.profile-grid-layout { max-width: 935px; margin: 0 auto; }
.hidden { display: none; }
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
.post-modal {
  position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 2000;
  display: flex; align-items: center; justify-content: center; padding: 2rem;
  backdrop-filter: blur(8px);
}
.modal-card { max-width: 600px; width: 100%; position: relative; animation: zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
.close-modal { position: absolute; top: -50px; right: -50px; color: white; background: none; border: none; font-size: 2.5rem; cursor: pointer; opacity: 0.8; transition: opacity 0.2s; }
.close-modal:hover { opacity: 1; }
@media (max-width: 768px) { .close-modal { right: 10px; top: -60px; } }
</style>
