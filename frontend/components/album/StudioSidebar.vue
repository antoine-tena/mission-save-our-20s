<template>
  <aside 
    class="studio-sidebar h-screen bg-white border-r border-gray-100 flex flex-col justify-between transition-all duration-300 select-none flex-shrink-0"
    :class="isSidebarCollapsed ? 'w-[70px]' : 'w-[260px]'"
  >
    <!-- TOP SECTION: Navigation Tabs & Title Rename -->
    <div class="flex flex-col min-h-0 flex-1">
      
      <!-- Studio Album Rename Input (Hides when collapsed) -->
      <div v-if="!isSidebarCollapsed" class="p-4 border-b border-gray-100 flex flex-col gap-1">
        <NuxtLink to="/album" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-1">
          <Icon name="lucide:chevron-left" /> Bibliothèque
        </NuxtLink>
        <label class="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Carnet d'album</label>
        <input 
          type="text" 
          :value="activeAlbum?.title" 
          @blur="e => activeAlbum && updateAlbumTitle(activeAlbum.id, (e.target as HTMLInputElement).value)" 
          class="w-full text-sm font-extrabold text-gray-800 border border-gray-100 focus:border-indigo-500 focus:bg-white rounded-lg bg-gray-50 px-2 py-1.5 outline-none transition-all"
        />
      </div>

      <!-- Icon-based Minimalist Navigation Tabs -->
      <nav class="flex border-b border-gray-100" :class="isSidebarCollapsed ? 'flex-col items-center p-2 gap-2' : 'p-2 justify-between'">
        <button 
          v-for="t in tabs" 
          :key="t.id"
          type="button"
          class="tab-btn flex flex-col items-center justify-center p-2 rounded-lg transition-all"
          :class="[
            activeSidebarTab === t.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50',
            isSidebarCollapsed ? 'w-10 h-10' : 'flex-1'
          ]"
          @click="activeSidebarTab = t.id"
          :title="t.label"
        >
          <Icon :name="t.icon" class="text-lg" />
          <span v-if="!isSidebarCollapsed" class="text-[9px] font-bold mt-1 tracking-tight">{{ t.shortLabel }}</span>
        </button>
      </nav>

      <!-- Active Tab Panel Content (Scrollable) -->
      <div class="flex-1 min-h-0 overflow-y-auto p-4">
        <!-- 1. PHOTOS PANEL -->
        <div v-if="activeSidebarTab === 'photos'" class="h-full flex flex-col min-h-0">
          <AlbumPhotoTray v-if="!isSidebarCollapsed" :photos="photos" :page-id="pageId" />
          <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
            <Icon name="lucide:image" class="text-xl" />
          </div>
        </div>

        <!-- 2. COUVERTURE PANEL -->
        <div v-else-if="activeSidebarTab === 'cover'" class="h-full flex flex-col min-h-0 gap-4">
          <p v-if="!isSidebarCollapsed" class="text-xs text-gray-500 text-center mb-1">Configurez les couvertures de votre livre photo.</p>
          <AlbumCoverEditor :is-back-cover="false" class="flex-col gap-4" />
        </div>

        <!-- 3. MISE EN PAGE PANEL -->
        <div v-else-if="activeSidebarTab === 'layouts'" class="flex flex-col gap-2 text-center text-xs text-gray-400 pt-4">
          <Icon name="lucide:layout" class="text-3xl mx-auto text-gray-300" />
          <span v-if="!isSidebarCollapsed">Ajustez les slots directement via la barre d'outils inférieure.</span>
        </div>

        <!-- 4. ARRIÈRE-PLANS (FONDS) PANEL -->
        <div v-else-if="activeSidebarTab === 'bg'" class="h-full flex flex-col min-h-0 gap-4">
          <p v-if="!isSidebarCollapsed" class="text-xs text-gray-500 text-center mb-1">Personnalisez le fond et les contours.</p>
          
          <div v-if="!isSidebarCollapsed" class="flex flex-col gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div class="flex items-center gap-1.5">
              <Icon name="lucide:book-open" class="text-indigo-500 text-base" />
              <span class="text-xs font-bold text-gray-700">Contour de l'album</span>
            </div>
            <p class="text-[10px] text-gray-500 leading-normal">
              Cette couleur s'applique sur le cadre extérieur/couverture visible autour des pages ouvertes.
            </p>
            
            <div class="flex flex-wrap gap-2 justify-center items-center mt-1">
              <button 
                v-for="c in coverPresets" 
                :key="c" 
                type="button" 
                class="cover-color-btn border-none cursor-pointer"
                :style="{ backgroundColor: c }"
                :class="{ 'active': activeAlbum?.cover_color === c }"
                @click="updateContourColor(c)"
                :title="c"
              ></button>
              
              <div class="hex-picker-wrapper">
                <button type="button" class="cover-color-btn hex-rainbow-btn border-none cursor-pointer" @click="triggerContourHexPicker" title="Couleur personnalisée (HEX)"></button>
                <input ref="contourHexInput" type="color" :value="activeAlbum?.cover_color || '#3d352e'" class="hidden-color-input" @input="onContourHexColorInput" />
              </div>
            </div>
          </div>
          
          <div v-else class="flex flex-col items-center gap-4 text-gray-400 pt-4">
            <Icon name="lucide:palette" class="text-xl" />
          </div>
        </div>

        <!-- OTHERS (Fallback) -->
        <div v-else class="flex flex-col gap-2 text-center text-xs text-gray-400 pt-4">
          <Icon name="lucide:package" class="text-3xl mx-auto text-gray-300" />
          <span v-if="!isSidebarCollapsed">Contenu additionnel en cours de chargement...</span>
        </div>
      </div>

    </div>

    <!-- BOTTOM SECTION: Retract / Hide Button -->
    <div class="p-3 border-t border-gray-100 flex items-center justify-center bg-gray-50/50">
      <button 
        type="button" 
        class="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-indigo-600 transition-all px-3 py-1.5 rounded-lg"
        @click="isSidebarCollapsed = !isSidebarCollapsed"
      >
        <Icon :name="isSidebarCollapsed ? 'lucide:chevrons-right' : 'lucide:chevrons-left'" class="text-base" />
        <span v-if="!isSidebarCollapsed">Masquer</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

defineProps<{
  photos: any[];
  pageId?: number;
}>();

const { activeAlbum, updateAlbumTitle, updateAlbumField, isSidebarCollapsed, activeSidebarTab } = useAlbumEditorStore();

const contourHexInput = ref<HTMLInputElement>();

const coverPresets = ['#1A1A1A', '#4A5568', '#1B365D', '#722F37', '#2D5A27', '#EAE6DF', '#FFFFFF', '#89CFF0'];

const updateContourColor = async (color: string) => {
  if (activeAlbum.value) {
    await updateAlbumField(activeAlbum.value.id, 'cover_color', color);
  }
};

const triggerContourHexPicker = () => {
  contourHexInput.value?.click();
};

const onContourHexColorInput = async (e: Event) => {
  const color = (e.target as HTMLInputElement).value;
  await updateContourColor(color);
};

const tabs = [
  { id: 'photos', label: 'Photos', shortLabel: 'Photos', icon: 'lucide:image' },
  { id: 'cover', label: 'Couverture', shortLabel: 'Couv', icon: 'lucide:book-open' },
  { id: 'layouts', label: 'Mise en page', shortLabel: 'Layouts', icon: 'lucide:layout' },
  { id: 'bg', label: 'Arrière-plans', shortLabel: 'Fonds', icon: 'lucide:palette' },
  { id: 'stickers', label: 'Stickers', shortLabel: 'Stickers', icon: 'lucide:smile' },
  { id: 'frames', label: 'Cadres', shortLabel: 'Cadres', icon: 'lucide:frame' },
  { id: 'masks', label: 'Masques', shortLabel: 'Masques', icon: 'lucide:scissors' }
];
</script>

<style scoped>
.tab-btn {
  outline: none;
  cursor: pointer;
}

/* Color Presets & Pickers style duplicates from cover-editor.css for seamless integration */
.cover-color-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s;
}
.cover-color-btn:hover {
  transform: scale(1.1);
}
.cover-color-btn.active {
  transform: scale(1.25);
  box-shadow: 0 0 0 2px #4f46e5;
}
.hex-rainbow-btn {
  background: linear-gradient(135deg, #ff0000, #00ff00, #0000ff);
}
.hidden-color-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}
.hex-picker-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>