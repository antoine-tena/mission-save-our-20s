<template>
  <div class="h-screen w-screen overflow-hidden flex bg-slate-100 select-none font-sans">
    <!-- 1. LEFT SIDEBAR PANEL -->
    <AlbumStudioSidebar :photos="photos" :page-id="pageId" />

    <!-- 2. CENTRAL WORKSPACE COLUMN -->
    <div class="flex-1 h-full flex flex-col min-w-0 min-h-0 relative">
      
      <!-- Central Canvas with Floating Top Bar -->
      <div class="flex-1 relative flex flex-col justify-center items-center p-8 min-h-0 min-w-0 overflow-hidden">
        
        <!-- Animated Background Blur -->
        <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div class="absolute top-[20%] right-[20%] w-[30rem] h-[30rem] bg-orange-300/10 rounded-full blur-[100px]"></div>
          <div class="absolute bottom-[20%] left-[20%] w-[30rem] h-[30rem] bg-amber-300/10 rounded-full blur-[100px]"></div>
        </div>

        <!-- Centered top floating actions bar -->
        <div class="absolute top-6 left-1/2 transform -translate-x-1/2 z-40">
          <AlbumCanvasToolbar />
        </div>

        <!-- The Book spreadsheets slot -->
        <div class="mt-12 flex-1 w-full flex items-center justify-center min-h-0 min-w-0 z-10">
          <slot name="canvas"></slot>
        </div>

      </div>

      <!-- Bottom chronological Spread carousel footer slot -->
      <slot name="footer"></slot>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  photos: any[];
  pageId?: number;
}>();
</script>