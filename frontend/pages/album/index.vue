<template>
  <div class="min-h-screen pt-[calc(var(--header-height)+3rem)] pb-24 bg-slate-50 overflow-hidden relative selection:bg-amber-200">
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] right-[5%] w-[40rem] h-[40rem] bg-amber-200/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 8s;"></div>
      <div class="absolute bottom-[5%] left-[5%] w-[35rem] h-[35rem] bg-orange-200/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 10s;"></div>
    </div>

    <header class="container mx-auto px-4 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-slate-200 pb-8">
      <div>
        <h1 class="font-serif text-5xl md:text-6xl font-black text-slate-900 tracking-tight flex items-center gap-4">
          Vos Carnets d'Albums
        </h1>
        <p class="text-amber-700 font-semibold mt-3 text-lg flex items-center gap-3">
          <span class="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse"></span>
          Créez, assemblez et feuilletez vos plus beaux souvenirs.
        </p>
      </div>
      <div class="flex items-center gap-4 self-start md:self-end">
        <NuxtLink to="/album/photos" class="bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-full font-bold hover:text-amber-600 hover:border-amber-600 hover:-translate-y-0.5 transition-all duration-300 shadow-sm flex items-center gap-2">
          <Icon name="lucide:grid" class="w-5 h-5" /> Galerie des Moments
        </NuxtLink>
        <button type="button" @click="showCreateModal = true" class="bg-slate-900 text-white px-6 py-3.5 rounded-full font-bold hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
          <Icon name="lucide:plus" class="w-5 h-5" /> Créer un Album
        </button>
      </div>
    </header>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Quick Auto-Generate Banner -->
      <div v-if="customAlbums.length === 0 && !isAlbumsLoading" class="backdrop-blur-xl bg-white/70 border border-amber-200/50 p-8 rounded-3xl shadow-xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-6">
          <div class="bg-amber-100 p-4 rounded-2xl">
            <Icon name="lucide:sparkles" class="w-10 h-10 text-amber-600 animate-bounce" style="animation-duration: 2s;" />
          </div>
          <div>
            <h3 class="font-serif text-2xl font-bold text-slate-900">Générateur Intelligent</h3>
            <p class="text-slate-600 mt-1">Laissez la magie opérer en regroupant automatiquement vos souvenirs par mois d'activité.</p>
          </div>
        </div>
        <button type="button" @click="handleAutoGenerate" :disabled="isGeneratingAuto" class="bg-amber-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap shadow-lg shadow-amber-600/20">
          <Icon :name="isGeneratingAuto ? 'lucide:loader-2' : 'lucide:sparkles'" :class="{ 'animate-spin': isGeneratingAuto }" class="w-5 h-5" />
          {{ isGeneratingAuto ? 'Génération...' : 'Générer par mois' }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isAlbumsLoading" class="flex flex-col items-center justify-center py-24 gap-6 text-slate-500 font-semibold">
        <div class="w-16 h-12 border-4 border-slate-800 rounded relative">
          <div class="absolute inset-y-0 right-0 w-1/2 bg-slate-800 origin-left animate-[pageTurn_1.2s_infinite]"></div>
        </div>
        <p>Ouverture de votre bibliothèque précieuse...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="customAlbums.length === 0" class="text-center py-24 px-4 max-w-2xl mx-auto backdrop-blur-md bg-white/40 rounded-3xl border border-slate-200/50">
        <Icon name="lucide:book-dashed" class="w-20 h-20 text-amber-400 mx-auto mb-6 opacity-80" />
        <h2 class="font-serif text-3xl font-black text-slate-900 mb-2">Votre bibliothèque est vierge.</h2>
        <p class="text-slate-600 mb-8">Commencez un nouveau livre photo ou importez vos clichés dans la galerie.</p>
        <div class="flex justify-center gap-4">
          <button @click="showCreateModal = true" class="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-amber-600 transition-colors">Lancer une création</button>
          <NuxtLink to="/album/photos" class="bg-white border border-slate-200 text-slate-700 px-8 py-3.5 rounded-full font-bold hover:text-amber-600 hover:border-amber-600 transition-colors">Uploader des photos</NuxtLink>
        </div>
      </div>

      <!-- Albums Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 perspective-1000">
        <div v-for="album in customAlbums" :key="album.id" class="group flex flex-col items-center">
          <!-- 3D Book Cover -->
          <NuxtLink :to="`/studio/album/${album.id}`" class="relative w-[300px] h-[400px] bg-[#3d352e] rounded-r-xl rounded-l-sm overflow-hidden shadow-[12px_16px_28px_rgba(0,0,0,0.15),_1px_2px_4px_rgba(0,0,0,0.1),_inset_3px_0_10px_rgba(255,255,255,0.05)] transform rotate-y-[-5deg] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-y-[-18deg] group-hover:translate-z-3 group-hover:-translate-y-2 group-hover:shadow-[20px_25px_40px_rgba(0,0,0,0.22),_2px_4px_8px_rgba(0,0,0,0.12)]">
            <!-- Spine Edge -->
            <div class="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 via-white/10 to-black/50 z-10 rounded-l-sm border-r border-white/5"></div>
            
            <div class="absolute inset-0 z-0">
              <img v-if="album.cover_photo_url" :src="album.cover_photo_url" alt="Couverture" class="w-full h-full object-cover brightness-90 sepia-[.08]" />
              <div v-else class="w-full h-full flex items-center justify-center bg-[#52473e] text-[#ebdcd0]">
                <Icon name="lucide:book-open" class="w-16 h-16 opacity-40" />
              </div>
              <!-- Light Wash overlay -->
              <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-black/5 to-transparent z-10"></div>
            </div>
          </NuxtLink>

          <!-- Book Info -->
          <div class="w-[300px] mt-6 flex flex-col gap-2">
            <h3 class="font-serif text-xl font-bold text-slate-900 truncate" :title="album.title">{{ album.title }}</h3>
            <div class="flex justify-between items-center">
              <span class="text-sm font-semibold text-slate-500 uppercase tracking-wider">Par {{ album.author_name || 'MSO' }}</span>
              <button @click.prevent="confirmDeleteBook(album)" class="text-slate-400 hover:text-red-500 hover:scale-110 transition-all p-2 rounded-full hover:bg-red-50" title="Supprimer">
                <Icon name="lucide:trash-2" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Album Modal -->
    <AlbumCreateModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
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
  showCreateModal.value = false;
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

<style>
@keyframes pageTurn {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(-180deg); }
}
.perspective-1000 {
  perspective: 1000px;
}
.rotate-y-\[-5deg\] {
  transform: rotateY(-5deg);
}
.rotate-y-\[-18deg\] {
  transform: rotateY(-18deg);
}
.translate-z-3 {
  transform: translateZ(12px);
}
</style>