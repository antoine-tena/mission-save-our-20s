<template>
  <div class="mso-album-library">
    <div class="mso-scrapbook-bg"></div>
    <header class="mso-album__header container">
      <div class="header-text">
        <h1 class="mso-title-fancy font-serif">Vos Carnets d'Albums</h1>
        <p class="mso-subtitle">
          <span class="pulse-dot"></span>
          Créez, assemblez et feuilletez vos plus beaux livres de souvenirs.
        </p>
      </div>
      <div class="header-actions">
        <!-- Navigation to Raw Gallery -->
        <NuxtLink to="/album/photos" class="mso-btn-secondary">
          <Icon name="lucide:grid" />
          <span>Galerie des Moments</span>
        </NuxtLink>
        <button 
          type="button" 
          class="mso-btn-add" 
          @click="showCreateModal = true"
        >
          <span class="icon">+</span>
          <span class="label">Créer un Album</span>
        </button>
      </div>
    </header>
    <div class="container library-body">
      <!-- Quick Auto-Generation Option -->
      <div class="quick-generate-banner glass-card" v-if="customAlbums.length === 0">
        <div class="banner-content">
          <Icon name="lucide:sparkles" class="banner-icon animate-bounce" />
          <div>
            <h3>Générateur Intelligent</h3>
            <p>Laissez la magie opérer en regroupant automatiquement vos souvenirs par mois d'activité.</p>
          </div>
        </div>
        <button 
          type="button" 
          class="btn-generate" 
          @click="handleAutoGenerate" 
          :disabled="isGeneratingAuto"
        >
          <Icon :name="isGeneratingAuto ? 'lucide:loader-2' : 'lucide:sparkles'" :class="{ 'spin': isGeneratingAuto }" />
          <span>Générer par mois</span>
        </button>
      </div>
      <!-- Albums Collection Grid -->
      <div v-if="isAlbumsLoading" class="loader-container">
        <div class="book-loader">
          <div class="book-page-loader"></div>
        </div>
        <p>Ouverture de votre bibliothèque précieuse...</p>
      </div>
      <div v-else-if="customAlbums.length === 0" class="empty-library glass-card">
        <Icon name="lucide:book-dashed" class="empty-icon" />
        <h2>Votre bibliothèque est vierge.</h2>
        <p>Commencez un nouveau livre photo ou importez vos clichés dans la galerie.</p>
        <div class="empty-actions">
          <button type="button" class="btn-create-now" @click="showCreateModal = true">Lancer une création</button>
          <NuxtLink to="/album/photos" class="btn-upload-now">Uploader des photos</NuxtLink>
        </div>
      </div>
      <div v-else class="albums-grid">
        <!-- Realistic 3D Cover Cards -->
        <div 
          v-for="album in customAlbums" 
          :key="album.id" 
          class="book-item"
        >
          <NuxtLink :to="`/studio/album/${album.id}`" class="book-card-link">
            <div class="book-spine-cover">
              <div class="book-spine-edge"></div>
              <div class="book-cover-image">
                <img v-if="album.cover_photo_url" :src="album.cover_photo_url" alt="Couverture" />
                <div v-else class="empty-cover">
                  <Icon name="lucide:book-open" class="text-4xl opacity-40" />
                </div>
                <div class="cover-wash"></div>
              </div>
            </div>
          </NuxtLink>
          <div class="book-info">
            <h3 class="book-title font-serif">{{ album.title }}</h3>
            <div class="book-footer">
              <span class="book-author">Par {{ album.author_name || 'MSO' }}</span>
              <button type="button" class="btn-delete-book" @click="confirmDeleteBook(album)" title="Supprimer cet album">
                <Icon name="lucide:trash-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Create Album Modal -->
    <AlbumCreateModal
      v-model="showCreateModal"
      @created="onAlbumCreated"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAlbums } from '~/composables/useAlbums';
import AlbumCreateModal from '~/components/album/AlbumCreateModal.vue';
const { customAlbums, isAlbumsLoading, fetchAlbums, deleteAlbum } = useAlbums();
const showCreateModal = ref(false);
const isGeneratingAuto = ref(false);
const handleAutoGenerate = async () => {
  isGeneratingAuto.value = true;
  try {
    const config = useRuntimeConfig();
    const token = useCookie<string | null>('auth_token');
    await $fetch(`${config.public.apiBase}/photos/albums/auto-generate/`, { 
      method: 'POST', 
      headers: { Authorization: `Token ${token.value}` } 
    });
    await fetchAlbums();
  } catch (err) {
    alert('Aucune photo libre disponible dans l\'archive.');
  } finally { 
    isGeneratingAuto.value = false; 
  }
};
const onAlbumCreated = async (alb: any) => {
  await fetchAlbums();
  navigateTo(`/studio/album/${alb.id}`);
};
const confirmDeleteBook = async (album: any) => {
  if (confirm(`Supprimer définitivement l'album "${album.title}" ?`)) {
    await deleteAlbum(album.id);
  }
};
onMounted(fetchAlbums);
useSeoMeta({ title: 'Bibliothèque d\'Albums — MSO20s' });
</script>
<style scoped>
@import '~/assets/css/album-library.css';
</style>