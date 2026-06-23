<template>
  <div class="social-profile-view" :class="profileUsername ? 'mso-scrapbook--' + profileUsername : ''">
    <SocialProfileHero 
      :profile="profile" :username="profileUsername" :posts-count="posts.length"
      :is-own-profile="isOwnProfile"
      @edit-cover="triggerInput(coverInput)" @edit-avatar="triggerInput(avatarInput)" @edit-profile="activeTab = 'info'"
    />
    <input v-if="isOwnProfile" ref="coverInput" type="file" class="hidden" accept="image/*" @change="onFileChange($event, 'cover_image')" />
    <input v-if="isOwnProfile" ref="avatarInput" type="file" class="hidden" accept="image/*" @change="onFileChange($event, 'avatar')" />

    <div class="container profile-grid-layout">
      <main class="profile-main-content">
        <SocialProfileTabs v-model:activeTab="activeTab" />

        <div class="tab-content-area">
          <Transition name="fade-slide" mode="out-in">
            <div v-if="activeTab === 'scrapbook'" key="scrapbook" class="scrapbook-section">
              <div class="mso-stickers" aria-hidden="true">
                <Icon 
                  v-for="i in 5" :key="i" 
                  :name="profileUsername === 'antoine' ? 'lucide:shield' : 'lucide:flower-2'" 
                  class="mso-sticker" 
                  :style="getStickerStyle(i)" 
                />
              </div>
              <div class="scrapbook-content-grid">
                <template v-if="profileUsername === 'antoine' || profileUsername === 'amani'">
                  <ProfileStatsCard 
                    :points="profile?.points || 0" 
                    :username="profileUsername" 
                    :style="{ order: profileUsername === 'antoine' ? 1 : 2 }"
                  />
                  <ProfileHighlightCard 
                    :username="profileUsername" 
                    :style="{ order: profileUsername === 'antoine' ? 2 : 1 }"
                  />
                </template>
                <template v-else>
                  <div class="glass-card p-8 text-center">
                    <Icon name="lucide:book-open" class="text-4xl mb-4 opacity-20" />
                    <p>Bienvenue dans ton carnet de bord personnel.</p>
                  </div>
                </template>
              </div>
            </div>

            <div v-else-if="activeTab === 'posts'" key="posts" class="posts-section">
              <SocialPostCreator 
                v-if="isOwnProfile"
                v-model:caption="newPostCaption" :avatar="profile?.avatar_url" 
                :preview="newPostPreview" :has-file="!!newPostFile" :is-submitting="isSubmittingPost" 
                @file-change="onPostFile" @remove-file="clearPostFile" @submit="submitPost" 
              />
              <SocialPostGrid :posts="posts" @select="selectedPost = $event" />
            </div>
            <SocialSidebarBio 
              v-else-if="activeTab === 'info'" key="info"
              :points="profile?.points || 0" :bio="profile?.bio || ''" :status="profile?.status || ''"
              :is-editing="isEditingBio" 
              :is-own-profile="isOwnProfile"
              @start-edit="isEditingBio = true" @save-bio="save('bio', $event)" @save-status="save('status', $event)"
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

const { user: currentUser } = useAuth();
const { profile, posts, fetchProfile, updateProfile, fetchPosts, createPost, likePost } = useSocial();

const route = useRoute();
const activeTab = ref('scrapbook'); const isEditingBio = ref(false); 
const coverInput = ref<HTMLInputElement>(); const avatarInput = ref<HTMLInputElement>();
const newPostCaption = ref(''); const newPostFile = ref<File | null>(null); 
const newPostPreview = ref<string | null>(null); const isSubmittingPost = ref(false);
const selectedPost = ref<SocialPost | null>(null);

const profileUsername = computed(() => (route.query.username as string) || currentUser.value?.username);
const isOwnProfile = computed(() => !route.query.username || route.query.username === currentUser.value?.username);

const getStickerStyle = (index: number) => ({
  top: `${15 + index * 18}%`,
  left: `${5 + (index % 2) * 80}%`,
  transform: `rotate(${(index * 30) % 360}deg)`,
  fontSize: '2.5rem',
  opacity: 0.2,
  position: 'absolute' as const,
  zIndex: 0
});

onMounted(() => {
  const username = profileUsername.value;
  if (username) {
    Promise.all([fetchProfile(username), fetchPosts(username)]);
  }
});

// Watch for query changes
watch(() => route.query.username, (newUsername) => {
  const username = (newUsername as string) || currentUser.value?.username;
  if (username) {
    fetchProfile(username);
    fetchPosts(username);
  }
});

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
@import '~/assets/css/profile.css';
</style>
