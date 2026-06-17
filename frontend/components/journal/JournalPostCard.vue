<template>
  <article class="feed-post-card glass-card">
    <div class="post-layout">
      <!-- Left Column: Avatar & Threads-style connection line -->
      <div class="post-left-col">
        <div class="post-avatar-wrapper">
          <ProfileAvatar size="lg" class="post-avatar-inner" :avatar-url="post.author.avatar_url" :username="post.author.username" />
          <!-- Glowing status dot -->
          <div class="avatar-status-dot"></div>
        </div>
        <!-- Thread-like line extending downwards -->
        <div class="thread-line"></div>
      </div>

      <!-- Right Column: All Post Content -->
      <div class="post-right-col">
        <!-- Post Header -->
        <header class="post-header-row">
          <div class="post-meta-info">
            <span class="post-author-name">{{ post.author.username }}</span>
            <span class="post-author-handle">@{{ post.author.username.toLowerCase() }}</span>
            <span class="meta-separator">•</span>
            <span class="post-timestamp" :title="formatFullDate(post.created_at)">{{ formatRelativeTime(post.created_at) }}</span>
            <template v-if="isAuthor">
              <span class="meta-separator">•</span>
              <button @click="showEditModal = true" class="text-slate-400 hover:text-indigo-600 transition-colors duration-200 cursor-pointer inline-flex items-center gap-0.5" title="Modifier">
                <Icon name="lucide:edit-2" class="w-3.5 h-3.5" />
                <span class="text-[10px] font-bold uppercase tracking-wider">Éditer</span>
              </button>
              <span class="meta-separator">•</span>
              <button @click="handleDelete" class="text-slate-400 hover:text-red-500 transition-colors duration-200 cursor-pointer inline-flex items-center gap-0.5" title="Supprimer">
                <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
                <span class="text-[10px] font-bold uppercase tracking-wider">Suppr.</span>
              </button>
            </template>
          </div>

          <!-- Badges & Weather DateTime Column -->
          <div class="flex flex-col items-end gap-1 flex-shrink-0">
            <div class="flex items-center gap-2">
              <!-- Location Badge -->
              <div v-if="post.location" class="post-location-chip" :title="post.location">
                <Icon name="lucide:map-pin" class="chip-icon" />
                <span>{{ post.location }}</span>
              </div>

              <!-- Weather Badge -->
              <div v-if="post.weather_info" class="post-weather-chip" :title="post.weather_info">
                <span>{{ post.weather_info }}</span>
              </div>
            </div>
            
            <!-- Tiny Weather Timestamp Caption -->
            <span v-if="post.weather_info && post.event_date" class="weather-datetime-sub">
              Météo du {{ formatEventDate(post.event_date) }}{{ post.event_time ? ' à ' + formatEventTime(post.event_time) : '' }}
            </span>
          </div>
        </header>

        <!-- Post Body -->
        <div class="post-body-content">
          <h2 v-if="post.title" class="post-title-text">{{ post.title }}</h2>
          <div v-if="post.caption" class="post-caption-text markdown-content" v-html="renderMarkdown(post.caption)"></div>

          <!-- Attachments Grid (Twitter / Instagram style) -->
          <div v-if="post.attachments && post.attachments.length > 0" class="post-attachments-container">
            <!-- Images & Videos Grid -->
            <div v-if="visualAttachments.length > 0" :class="['media-grid-wrapper', `grid-count-${Math.min(visualAttachments.length, 4)}`]">
              <div v-for="(att, idx) in visualAttachments.slice(0, 4)" :key="att.id" class="media-grid-item" @click="openLightbox(idx)">
                <img v-if="att.file_type === 'IMAGE'" :src="att.file_url" :alt="att.caption || 'Photo'" class="grid-media-element" />
                <video v-else-if="att.file_type === 'VIDEO'" :src="att.file_url" controls class="grid-media-element" @click.stop></video>
                <div v-if="att.caption" class="grid-media-caption-overlay">
                  <p class="media-overlay-text">{{ att.caption }}</p>
                </div>
                <div v-if="idx === 3 && visualAttachments.length > 4" class="media-more-overlay">
                  <span class="more-count">+{{ visualAttachments.length - 4 }}</span>
                </div>
              </div>
            </div>

            <!-- Documents & PDFs Row -->
            <div v-if="docAttachments.length > 0" class="docs-attachments-row">
              <div v-for="att in docAttachments" :key="att.id" class="doc-attachment-bar">
                <div class="doc-bar-icon-box">
                  <Icon :name="att.file_type === 'PDF' ? 'lucide:file-text' : 'lucide:file'" class="doc-bar-icon" />
                </div>
                <div class="doc-bar-details">
                  <span class="doc-bar-name">{{ att.file_name }}</span>
                  <span v-if="att.caption" class="doc-bar-caption">{{ att.caption }}</span>
                </div>
                <a :href="att.file_url" target="_blank" download class="doc-bar-download-btn" title="Télécharger">
                  <Icon name="lucide:download" class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Action Bar (Twitter / Threads style) -->
        <footer class="post-action-bar">
          <button class="action-btn-item love" @click="toggleLike">
            <Icon :name="isLiked ? 'lucide:heart-handshake' : 'lucide:heart'" class="action-icon" :class="{ 'liked': isLiked }" />
            <span class="action-count">{{ likeCount }}</span>
          </button>
          
          <button class="action-btn-item bookmark" @click="toggleBookmark">
            <Icon :name="isBookmarked ? 'lucide:bookmark-check' : 'lucide:bookmark'" class="action-icon" :class="{ 'bookmarked': isBookmarked }" />
          </button>

          <button class="action-btn-item share" @click="sharePost" title="Copier le lien">
            <Icon name="lucide:share-2" class="action-icon" />
          </button>
        </footer>
      </div>
    </div>

    <!-- Beautiful Lightbox Modal for Visual Attachments -->
    <Transition name="fade">
      <div v-if="showLightbox" class="lightbox-modal" @click="closeLightbox">
        <button class="lightbox-close-btn" @click="closeLightbox">
          <Icon name="lucide:x" class="w-8 h-8" />
        </button>
        <div class="lightbox-content-wrapper" @click.stop>
          <button class="lightbox-nav-btn prev" @click="prevSlide" v-if="visualAttachments.length > 1">
            <Icon name="lucide:chevron-left" class="w-8 h-8" />
          </button>
          <div class="lightbox-main-media">
            <img v-if="visualAttachments[activeSlideIdx].file_type === 'IMAGE'" :src="visualAttachments[activeSlideIdx].file_url" class="lightbox-img" />
            <video v-else-if="visualAttachments[activeSlideIdx].file_type === 'VIDEO'" :src="visualAttachments[activeSlideIdx].file_url" controls autoplay class="lightbox-video"></video>
            <p v-if="visualAttachments[activeSlideIdx].caption" class="lightbox-caption">{{ visualAttachments[activeSlideIdx].caption }}</p>
          </div>
          <button class="lightbox-nav-btn next" @click="nextSlide" v-if="visualAttachments.length > 1">
            <Icon name="lucide:chevron-right" class="w-8 h-8" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Modal for Editing Post Properties/Content -->
    <JournalEditorModal
      :show="showEditModal"
      :post="post"
      @close="showEditModal = false"
      @save="handleSaveEdit"
    />
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { renderMarkdown } from '~/utils/formatters';
import { useRichPosts } from '~/composables/useRichPosts';
import { useAuth } from '~/composables/useAuth';
import JournalEditorModal from './JournalEditorModal.vue';

const props = defineProps<{ post: any }>();

const { toggleLikeRichPost, toggleBookmarkRichPost, deleteRichPost, updateRichPost } = useRichPosts();
const { user } = useAuth();

const visualAttachments = computed(() => {
  return props.post.attachments?.filter((att: any) => ['IMAGE', 'VIDEO'].includes(att.file_type)) || [];
});

const docAttachments = computed(() => {
  return props.post.attachments?.filter((att: any) => !['IMAGE', 'VIDEO'].includes(att.file_type)) || [];
});

const isAuthor = computed(() => user.value?.username === props.post.author.username);

// Interactive values linked to backend
const isLiked = computed(() => props.post.is_liked_by_me);
const likeCount = computed(() => props.post.likes_count || 0);
const isBookmarked = computed(() => props.post.is_bookmarked_by_me);

const toggleLike = async () => {
  await toggleLikeRichPost(props.post.id);
};

const toggleBookmark = async () => {
  await toggleBookmarkRichPost(props.post.id);
};

const handleDelete = async () => {
  if (confirm('Voulez-vous vraiment supprimer cette page du journal de bord ?')) {
    await deleteRichPost(props.post.id);
  }
};

const showEditModal = ref(false);

const handleSaveEdit = async (payload: any) => {
  const success = await updateRichPost(props.post.id, payload);
  if (success) {
    showEditModal.value = false;
  } else {
    alert('Une erreur est survenue lors de la modification.');
  }
};

const sharePost = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.origin + `/journal?id=${props.post.id}`);
    alert('Lien de la publication copié !');
  }
};

// Lightbox states
const showLightbox = ref(false);
const activeSlideIdx = ref(0);

const openLightbox = (idx: number) => {
  activeSlideIdx.value = idx;
  showLightbox.value = true;
};

const closeLightbox = () => {
  showLightbox.value = false;
};

const prevSlide = () => {
  activeSlideIdx.value = (activeSlideIdx.value - 1 + visualAttachments.value.length) % visualAttachments.value.length;
};

const nextSlide = () => {
  activeSlideIdx.value = (activeSlideIdx.value + 1) % visualAttachments.value.length;
};

// Date formatting helpers
const formatRelativeTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `il y a ${diffMins}m`;
  if (diffHrs < 24) return `il y a ${diffHrs}h`;
  if (diffDays < 7) return `il y a ${diffDays}j`;

  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const formatFullDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatEventDate = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, monthIdx, day);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatEventTime = (timeStr: string) => {
  if (!timeStr) return '';
  return timeStr.substring(0, 5);
};
</script>

<style scoped>
:deep(.markdown-content) {
  font-size: 1rem;
  line-height: 1.6;
  color: #334155;
}
</style>
