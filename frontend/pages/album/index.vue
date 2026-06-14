<template>
  <div class="min-h-screen pt-[calc(var(--header-height)+3rem)] pb-24 bg-slate-50 overflow-hidden relative selection:bg-amber-200">
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] right-[5%] w-[40rem] h-[40rem] bg-amber-200/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 8s;"></div>
      <div class="absolute bottom-[5%] left-[5%] w-[35rem] h-[35rem] bg-orange-200/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 10s;"></div>
    </div>

    <header class="container mx-auto px-4 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-slate-200 pb-8">
      <div>
        <h1 class="font-display text-5xl md:text-6xl font-bold text-slate-800 tracking-tight flex items-center gap-4">
          Vos Carnets d'Albums <Icon name="lucide:book-open-check" class="text-amber-500 w-12 h-12" />
        </h1>
        <p class="text-amber-600 font-semibold mt-2 text-lg uppercase tracking-widest">Créez, assemblez et feuilletez vos plus beaux souvenirs.</p>
      </div>
      <div class="flex items-center gap-4 self-start md:self-end">
        <NuxtLink to="/album/photos" class="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold hover:text-amber-600 hover:border-amber-600 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-2">
          <Icon name="lucide:grid" class="w-5 h-5" /> Galerie des Moments
        </NuxtLink>
        <button type="button" @click="showCreateModal = true" class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
          <Icon name="lucide:plus" class="w-5 h-5" /> Créer un Album
        </button>
      </div>
    </header>

    <div class="container mx-auto px-4 relative z-10">
      <!-- Quick Auto-Generate Banner -->
      <div v-if="customAlbums.length > 0 && !isAlbumsLoading" class="relative overflow-hidden backdrop-blur-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 p-8 rounded-3xl shadow-xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <!-- Floating ambient glowing circles inside banner -->
        <div class="absolute -right-20 -top-20 w-48 h-48 bg-amber-400/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div class="absolute -left-20 -bottom-20 w-48 h-48 bg-orange-400/20 rounded-full blur-[60px] pointer-events-none"></div>

        <div class="flex items-center gap-6 relative z-10">
          <div class="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl shadow-lg shadow-amber-500/30">
            <Icon name="lucide:sparkles" class="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <h3 class="font-display text-2xl font-black text-slate-800 tracking-tight">Générateur Intelligent</h3>
            <p class="text-slate-600 mt-1 max-w-xl font-medium">Laissez notre IA assembler et classer automatiquement vos clichés précieux par mois d'activité pour créer vos souvenirs instantanément.</p>
          </div>
        </div>
        <button 
          type="button" 
          @click="handleAutoGenerate" 
          :disabled="isGeneratingAuto" 
          class="relative z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
        >
          <Icon :name="isGeneratingAuto ? 'lucide:loader-2' : 'lucide:cpu'" :class="{ 'animate-spin': isGeneratingAuto }" class="w-5 h-5" />
          <span>{{ isGeneratingAuto ? 'Génération en cours...' : 'Générer par mois' }}</span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isAlbumsLoading" class="flex flex-col items-center justify-center py-24 gap-6 text-slate-500 font-semibold">
        <div class="w-20 h-16 border-4 border-slate-800 rounded-lg relative bg-white/20 backdrop-blur-md shadow-lg flex items-center justify-center">
          <Icon name="lucide:loader-2" class="w-8 h-8 text-amber-500 animate-spin" />
        </div>
        <p class="text-lg text-slate-600 font-medium animate-pulse">Ouverture de votre bibliothèque précieuse...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="customAlbums.length === 0" class="text-center py-20 px-8 max-w-2xl mx-auto backdrop-blur-xl bg-white/60 rounded-3xl border border-slate-200/50 shadow-xl relative overflow-hidden">
        <div class="absolute -right-16 -bottom-16 w-36 h-36 bg-amber-400/10 rounded-full blur-[40px] pointer-events-none"></div>
        <Icon name="lucide:book-dashed" class="w-24 h-24 text-amber-400 mx-auto mb-6 animate-pulse" style="animation-duration: 3s;" />
        <h2 class="font-display text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Votre bibliothèque est vierge.</h2>
        <p class="text-slate-500 mb-8 max-w-md mx-auto font-medium">Commencez un nouveau carnet de souvenirs ou importez vos clichés précieux dans la galerie pour lancer la création.</p>
        <div class="flex justify-center gap-4 flex-wrap">
          <button @click="showCreateModal = true" class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
            <Icon name="lucide:plus" class="w-5 h-5" /> Lancer une création
          </button>
          <NuxtLink to="/album/photos" class="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold hover:text-amber-600 hover:border-amber-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm flex items-center gap-2">
            <Icon name="lucide:image" class="w-5 h-5" /> Importer des photos
          </NuxtLink>
        </div>
      </div>

      <!-- Albums Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16 perspective-1000">
        <div v-for="(album, index) in customAlbums" :key="album.id" class="group flex flex-col items-center">
          <!-- 3D Book Cover -->
          <NuxtLink 
            :to="`/studio/album/${album.id}`" 
            class="relative w-full max-w-[250px] aspect-[3/4] rounded-r-2xl rounded-l-[4px] overflow-hidden shadow-[8px_12px_24px_rgba(0,0,0,0.25),_1px_2px_4px_rgba(0,0,0,0.1),_inset_3px_0_10px_rgba(255,255,255,0.08)] transform rotate-y-[-6deg] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-y-[-20deg] group-hover:translate-z-6 group-hover:-translate-y-3 group-hover:shadow-[24px_30px_48px_rgba(0,0,0,0.35),_2px_4px_12px_rgba(0,0,0,0.18)] flex flex-col justify-between p-6 bg-gradient-to-br"
            :class="getAlbumThemeClass(index)"
          >
            <!-- Realistic Book Spine Line & Accent -->
            <div class="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/45 via-white/10 to-black/55 z-20 rounded-l-[4px] border-r border-white/5"></div>
            <div class="absolute left-3.5 top-0 bottom-0 w-[1px] bg-white/20 z-20"></div>

            <!-- Subtle Textured Linen/Leather overlay -->
            <div class="absolute inset-0 opacity-[0.06] bg-repeat pointer-events-none z-10 mix-blend-overlay" style="background-image: radial-gradient(circle, #fff 10%, transparent 11%); background-size: 3px 3px;"></div>

            <!-- Polaroid-like Hand-Pasted Cover Image if exists -->
            <div v-if="album.cover_photo_url" class="relative w-[85%] mx-auto mt-2 aspect-square bg-white p-2 pb-5 rounded-sm shadow-md rotate-[-2deg] z-10 transition-transform duration-500 group-hover:rotate-[2deg] group-hover:scale-[1.03]">
              <img :src="album.cover_photo_url" alt="Couverture" class="w-full h-full object-cover grayscale-[15%] sepia-[0.05]" />
              <!-- Hand-drawn tape effect -->
              <div class="absolute -top-3 left-[25%] right-[25%] h-5 bg-white/40 backdrop-blur-[1px] border border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] rotate-[-1deg]"></div>
            </div>

            <!-- Big Default Icon if no image -->
            <div v-else class="relative w-[75%] mx-auto mt-4 aspect-square rounded-2xl bg-black/15 flex items-center justify-center border border-white/10 z-10">
              <Icon name="lucide:book-open" class="w-12 h-12 text-white/40" />
            </div>

            <!-- Gold Embossed Title (Sits at the bottom of the cover) -->
            <div class="relative z-10 text-center w-full mt-auto pt-4 border-t border-white/10">
              <span class="block font-display text-sm font-extrabold uppercase tracking-[2px] text-amber-100/90 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] truncate">
                {{ album.title }}
              </span>
              <span class="block text-[10px] font-medium tracking-wider text-white/50 mt-1 uppercase">
                Vol. {{ index + 1 }}
              </span>
            </div>

            <!-- Gold Ornaments at Corners -->
            <div class="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-amber-200/20 rounded-tr-[2px] pointer-events-none"></div>
            <div class="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-amber-200/20 rounded-br-[2px] pointer-events-none"></div>
          </NuxtLink>

          <!-- Book Info -->
          <div class="w-full max-w-[250px] mt-5 flex flex-col gap-1.5 px-1">
            <h3 class="font-display text-lg font-bold text-slate-800 truncate" :title="album.title">
              {{ album.title }}
            </h3>
            <div class="flex justify-between items-center text-xs">
              <span class="px-2.5 py-1 bg-slate-100 text-slate-500 font-bold uppercase rounded-md tracking-wider">
                Par {{ album.author_name || 'Antoine' }}
              </span>
              <button 
                @click.prevent="confirmDeleteBook(album)" 
                class="text-slate-400 hover:text-red-500 hover:scale-110 p-2 rounded-full hover:bg-red-50 transition-all duration-200" 
                title="Supprimer définitivement l'album"
              >
                <Icon name="lucide:trash-2" class="w-4.5 h-4.5" />
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

const getAlbumThemeClass = (index: number) => {
  const themes = [
    'from-[#1e293b] to-[#0f172a] text-slate-100', // Midnight Blue
    'from-[#2a1a15] to-[#140f0c] text-amber-100', // Terracotta Leather
    'from-[#064e3b] to-[#022c22] text-emerald-100', // British Racing Green
    'from-[#4c1d95] to-[#2e1065] text-purple-100', // Royal Amethyst
    'from-[#1c1917] to-[#0c0a09] text-stone-100', // Obsidian Black
    'from-[#701a75] to-[#4a044e] text-fuchsia-100', // Deep Magenta
  ];
  return themes[index % themes.length];
};

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
