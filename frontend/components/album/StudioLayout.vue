<template>
  <div class="studio-layout-root h-screen w-screen overflow-hidden flex bg-[#FAF9F6] select-none">
    <!-- 1. LEFT SIDEBAR PANEL -->
    <AlbumStudioSidebar :photos="photos" :page-id="pageId" />

    <!-- 2. CENTRAL WORKSPACE COLUMN -->
    <div class="studio-central-column flex-1 h-full flex flex-col min-w-0 min-h-0">
      
      <!-- Central Canvas with Floating Top Bar -->
      <div class="studio-canvas-space flex-1 relative flex flex-col justify-center items-center p-8 min-h-0 min-w-0 overflow-hidden">
        
        <!-- Centered top floating actions bar -->
        <div class="absolute top-6 left-1/2 transform -translate-x-1/2 z-40">
          <AlbumCanvasToolbar />
        </div>

        <!-- The Book spreadsheets slot -->
        <div class="book-canvas-wrapper flex-1 w-full flex items-center justify-center min-h-0 min-w-0">
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

<style scoped>
.studio-layout-root {
  font-family: inherit;
  border: 4px solid #3b82f6 !important; /* Blue 500: Root Layout */
}
.studio-central-column {
  border: 3px solid #06b6d4 !important; /* Cyan 500: Central Workspace */
}
.studio-canvas-space {
  border: 3.5px dashed #10b981 !important; /* Emerald 500: Canvas Space */
}
.book-canvas-wrapper {
  margin-top: 3rem;
  border: 3px dashed #ef4444 !important; /* Red 500: Book Wrapper */
}
</style>