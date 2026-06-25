<template>
  <div v-if="!isSidebarCollapsed" class="sidebar-rename-block p-4 border-b border-gray-100 flex flex-col gap-3.5 bg-gray-50/50 rounded-xl animate-fade-in">
    <NuxtLink to="/album" class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
      <Icon name="lucide:chevron-left" /> Bibliothèque
    </NuxtLink>
    
    <!-- Album Identity Card -->
    <div class="flex gap-3 items-start">
      <!-- Left: Elegant Album Cover Icon with Live Cover Color -->
      <div 
        class="w-12 h-14 rounded-lg flex items-center justify-center shadow-md border border-white flex-shrink-0 relative overflow-hidden transition-all duration-300"
        :style="{ backgroundColor: activeAlbum?.cover_color || '#3d352e' }"
      >
        <!-- Spine line details to make it look like a physical notebook -->
        <div class="absolute left-0 top-0 bottom-0 w-2.5 bg-black/10 border-r border-white/5"/>
        <Icon name="lucide:book-heart" class="text-xl text-white/90" />
      </div>

      <!-- Right: Album Title Rename Input and metadata -->
      <div class="flex-1 flex flex-col gap-1 min-w-0">
        <label class="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Titre du carnet</label>
        <input 
          type="text" 
          :value="activeAlbum?.title" 
          placeholder="Mon bel album..." 
          class="w-full text-xs font-extrabold text-gray-800 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-lg bg-white px-2.5 py-1.5 outline-none transition-all shadow-sm"
          @blur="e => activeAlbum && updateAlbumTitle(activeAlbum.id, (e.target as HTMLInputElement).value)"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';

const { activeAlbum, updateAlbumTitle, isSidebarCollapsed } = useAlbumEditorStore();
</script>

<style scoped>
/* Cleaned up debug borders */
</style>