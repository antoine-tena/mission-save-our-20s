<template>
  <div v-if="!isSidebarCollapsed" class="flex flex-col gap-4 h-full min-h-0 animate-fade-in select-none">
    <div class="px-1">
      <p class="text-[11px] text-indigo-600 font-extrabold uppercase tracking-wider mb-1">Style de Cadres</p>
      <p class="text-[10px] text-gray-400 leading-normal">
        Choisissez un style de cadre artistique pour habiller l'ensemble des photos de votre carnet.
      </p>
    </div>

    <!-- Visual Previews 2-Column Grid -->
    <div class="flex-1 overflow-y-auto pr-1 grid grid-cols-2 gap-2 pb-6">
      <button
        v-for="frame in frames"
        :key="frame.id"
        type="button"
        class="text-center p-1.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between cursor-pointer group relative"
        :class="[
          isActive(frame.id)
            ? 'bg-indigo-50/50 border-indigo-200 shadow-sm'
            : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200'
        ]"
        @click="selectFrame(frame.id)"
      >
        <!-- Mini CSS Visual Preview Container -->
        <div class="w-full aspect-[4/3] rounded-lg bg-slate-50/50 border border-slate-100 flex items-center justify-center p-2.5 overflow-hidden relative mb-1">
          <!-- Mini Frame Replica -->
          <div 
            class="w-12 h-10 rounded bg-white flex flex-col justify-between p-0.5 shadow-sm border border-black/5"
            :class="`mini-frame-style-${frame.id}`"
          >
            <!-- Mini inner image placeholder -->
            <div class="flex-1 bg-slate-100 rounded-sm overflow-hidden flex items-center justify-center">
              <Icon :name="frame.icon" class="text-[7px] text-slate-400" />
            </div>
            <!-- Mini Polaroid bottom write strip if needed -->
            <div 
              v-if="frame.id.includes('polaroid') || frame.id === 'handwritten' || frame.id === 'dotted-grid'" 
              class="h-0.5 w-full bg-slate-100 mt-0.5 rounded-full"
            ></div>
          </div>
        </div>

        <!-- Frame Title -->
        <span class="text-[9px] font-bold text-gray-600 group-hover:text-indigo-600 truncate w-full px-0.5 mt-0.5">
          {{ frame.name }}
        </span>
      </button>
    </div>
  </div>
  <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
    <Icon name="lucide:frame" class="text-xl" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { useAlbumEditorActions } from '~/composables/useAlbumEditorActions';

defineProps<{ isSidebarCollapsed: boolean; }>();

const { activeAlbum, activePageIdx } = useAlbumEditorStore();
const { updatePageField } = useAlbumEditorActions();

const frames = [
  { id: 'no-frame', name: 'Pas de cadre', icon: 'lucide:square' },
  { id: 'polaroid-tape', name: 'Polaroid & Scotch', icon: 'lucide:images' },
  { id: 'polaroid-clean', name: 'Polaroid simple', icon: 'lucide:image' },
  { id: 'film-strip', name: 'Pellicule Ciné', icon: 'lucide:clapperboard' },
  { id: 'postcard', name: 'Timbre Postal', icon: 'lucide:mail' },
  { id: 'gold-luxury', name: 'Liseré Doré', icon: 'lucide:award' },
  { id: 'doodle', name: 'Gribouillage', icon: 'lucide:pen-tool' },
  { id: 'washi-corners', name: 'Scotch 4 angles', icon: 'lucide:layout-grid' },
  { id: 'rustic-wood', name: 'Bois Rustique', icon: 'lucide:tree-pine' },
  { id: 'shadowbox', name: 'Papier découpé', icon: 'lucide:layers' },
  { id: 'notepad-torn', name: 'Page déchirée', icon: 'lucide:notebook' },
  { id: 'polaroid-pink', name: 'Polaroid Rose', icon: 'lucide:heart' },
  { id: 'polaroid-dark', name: 'Polaroid Sombre', icon: 'lucide:moon' },
  { id: 'neon-glow', name: 'Néon Indigo', icon: 'lucide:sparkles' },
  { id: 'vintage-paper', name: 'Vieux Journal', icon: 'lucide:newspaper' },
  { id: 'handwritten', name: 'Manuscrit ♥', icon: 'lucide:feather' },
  { id: 'dotted-grid', name: 'Carnet Pointillé', icon: 'lucide:grid' }
];

const leftPage = computed(() => activeAlbum.value?.pages[activePageIdx.value] || null);
const currentFrameId = computed(() => leftPage.value?.location || 'polaroid-tape');
const isActive = (id: string) => currentFrameId.value === id;

const selectFrame = async (id: string) => {
  if (!activeAlbum.value) return;
  
  // 1. Update all local pages
  activeAlbum.value.pages.forEach(p => {
    p.location = id;
  });

  // 2. Force global deep reactivity update in Vue
  activeAlbum.value = { ...activeAlbum.value };

  // 3. Persist to database in parallel
  const promises = activeAlbum.value.pages.map(p => updatePageField(p.id, 'location', id));
  await Promise.all(promises);
};
</script>

<style scoped>
@import '~/assets/css/polaroid-photo.css';

/* Mini CSS Visual Previews overrides */
.mini-frame-style-no-frame { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
.mini-frame-style-polaroid-tape { background: #fcfcf9 !important; padding: 1.5px 1.5px 3.5px 1.5px !important; }
.mini-frame-style-polaroid-clean { background: #fcfcf9 !important; padding: 1.5px 1.5px 3.5px 1.5px !important; }
.mini-frame-style-film-strip { background: #111827 !important; border: 1px solid #1f2937 !important; }
.mini-frame-style-postcard { background: #fdfbf7 !important; border: 1px dashed #d97706 !important; }
.mini-frame-style-gold-luxury { background: #fbfaf8 !important; border: 1.5px double #d4af37 !important; }
.mini-frame-style-doodle { background: #ffffff !important; border: 1px solid #1e293b !important; border-radius: 4px 2px !important; }
.mini-frame-style-washi-corners { background: #fcfcf9 !important; border: 1.5px solid rgba(0,0,0,0.04) !important; }
.mini-frame-style-rustic-wood { background: #5c4033 !important; border: 1.5px solid #3d2b1f !important; }
.mini-frame-style-shadowbox { background: #ffffff !important; box-shadow: inset 0 2px 4px rgba(0,0,0,0.08) !important; }
.mini-frame-style-notepad-torn { background: #fdfdfa !important; border-top: 1.5px dashed #d1d5db !important; }
.mini-frame-style-polaroid-pink { background: #fff0f3 !important; padding: 1.5px 1.5px 3.5px 1.5px !important; }
.mini-frame-style-polaroid-dark { background: #1e1e1e !important; padding: 1.5px 1.5px 3.5px 1.5px !important; }
.mini-frame-style-neon-glow { background: #0f172a !important; border: 1px solid #6366f1 !important; }
.mini-frame-style-vintage-paper { background: #faf4eb !important; border: 1px solid #ebd8c5 !important; }
.mini-frame-style-handwritten { background: #ffffff !important; padding: 1.5px 1.5px 4px 1.5px !important; }
.mini-frame-style-dotted-grid { background: #fafaf7 !important; padding: 1.5px 1.5px 3.5px 1.5px !important; }
</style>