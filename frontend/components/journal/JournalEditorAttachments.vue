<template>
  <div class="composer-attachments-section mt-6 p-6 rounded-2xl border border-dashed border-slate-200">
    <div class="attachments-upload-header-row flex items-center justify-between">
      <h4 class="attachments-heading text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 m-0">
        <Icon name="lucide:paperclip" class="w-4 h-4 text-indigo-500" />
        Médias &amp; Documents joints ({{ attachments.length }})
      </h4>
      <button type="button" class="upload-trigger-inline-btn" @click="triggerFileInput">
        <Icon name="lucide:plus" class="w-4 h-4" />
        <span>Parcourir</span>
      </button>
    </div>

    <!-- Drag & Drop Zone -->
    <div 
      class="dropzone-zen mt-4" 
      @click="triggerFileInput"
      @dragover.prevent="isDragOverLocal = true"
      @dragleave.prevent="isDragOverLocal = false"
      @drop.prevent="handleFileDrop"
      :class="{ 'drag-over': isDragOverLocal }"
    >
      <Icon name="lucide:cloud-upload" class="dropzone-icon" />
      <p v-if="!isDragOverLocal">Glissez-déposez des clichés ou des fichiers ici</p>
      <p v-else class="text-indigo-500 font-bold">Lâchez pour charger !</p>
      <span class="dropzone-hint">Supporte Images, Vidéos MP4 et documents PDF (Max 10 Mo)</span>
    </div>

    <input 
      ref="fileInput" 
      type="file" 
      class="hidden" 
      multiple 
      accept="image/*,video/*,application/pdf" 
      @change="handleFileChange" 
    />

    <!-- Inline list of loaded files with captions -->
    <Transition name="slide-up">
      <div v-if="attachments.length > 0" class="composer-attachments-grid mt-4">
        <div v-for="(att, idx) in attachments" :key="idx" class="composer-att-card">
          <div class="att-media-preview">
            <img v-if="att.fileType === 'IMAGE'" :src="att.previewUrl" class="att-preview-img" />
            <div v-else-if="att.fileType === 'VIDEO'" class="att-preview-placeholder video">
              <Icon name="lucide:video" class="w-8 h-8 text-indigo-500 animate-pulse" />
            </div>
            <div v-else class="att-preview-placeholder document">
              <Icon name="lucide:file-text" class="w-8 h-8 text-slate-500" />
            </div>
            <div class="file-name-overlay">{{ att.file.name }}</div>
            
            <button type="button" class="quick-delete-btn" @click="$emit('remove-attachment', idx)" title="Supprimer">
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>
          
          <div class="att-inputs-column">
            <input 
              :model-value="att.caption" 
              @input="updateCaption(idx, ($event.target as HTMLInputElement).value)"
              type="text" 
              class="att-caption-input" 
              placeholder="Ajoutez une légende pour ce fichier..." 
            />
            <div class="att-loc-wrapper">
              <Icon name="lucide:map-pin" class="w-3.5 h-3.5 text-slate-400" />
              <LocationAutocomplete 
                :model-value="att.location" 
                @update:modelValue="updateLocation(idx, $event)"
                placeholder="Lieu de ce cliché..." 
                class="att-location-input"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LocationAutocomplete from '~/components/LocationAutocomplete.vue';

const props = defineProps<{
  attachments: any[];
}>();

const emit = defineEmits<{
  (e: 'add-files', files: FileList): void;
  (e: 'remove-attachment', index: number): void;
  (e: 'update-attachment', data: { index: number; field: string; value: string }): void;
}>();

const isDragOverLocal = ref(false);
const fileInput = ref<HTMLInputElement>();

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    emit('add-files', target.files);
  }
};

const handleFileDrop = (e: DragEvent) => {
  isDragOverLocal.value = false;
  if (e.dataTransfer?.files) {
    emit('add-files', e.dataTransfer.files);
  }
};

const updateCaption = (index: number, val: string) => {
  emit('update-attachment', { index, field: 'caption', value: val });
};

const updateLocation = (index: number, val: string) => {
  emit('update-attachment', { index, field: 'location', value: val });
};
</script>

<style scoped>
/* Media & Docs Upload Deck Local Style */
.composer-attachments-section {
  background: white !important;
  border: 1px solid #f1f5f9 !important;
  border-radius: 20px !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02) !important;
}
.attachments-upload-header-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}
.attachments-heading {
  margin: 0 !important;
}
.upload-trigger-inline-btn {
  background: #f1f5f9 !important;
  color: #4f46e5 !important;
  border: none !important;
  font-size: 0.75rem !important;
  font-weight: 700 !important;
  padding: 0.4rem 0.85rem !important;
  border-radius: 8px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}
.upload-trigger-inline-btn:hover {
  background: #e0e7ff !important;
}
.dropzone-zen {
  border: 2px dashed #e2e8f0 !important;
  border-radius: 12px !important;
  padding: 1.5rem !important;
  text-align: center !important;
  cursor: pointer !important;
  background: #f8fafc !important;
  transition: all 0.2s ease !important;
}
.dropzone-zen:hover, .dropzone-zen.drag-over {
  border-color: #6366f1 !important;
  background: #f5f3ff !important;
}
.dropzone-icon {
  width: 2.25rem !important;
  height: 2.25rem !important;
  color: #94a3b8 !important;
  margin-bottom: 0.5rem !important;
}
.dropzone-zen p {
  margin: 0 0 0.25rem !important;
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  color: #475569 !important;
}
.dropzone-hint {
  font-size: 0.65rem !important;
  color: #94a3b8 !important;
  font-weight: 500 !important;
}
/* Attachments list style */
.composer-attachments-grid {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
}
.composer-att-card {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
  padding: 0.75rem !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 12px !important;
}
.att-media-preview {
  position: relative !important;
  width: 70px !important;
  height: 70px !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
}
.att-preview-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}
.att-preview-placeholder {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.att-preview-placeholder.video {
  background: #e0e7ff !important;
}
.att-preview-placeholder.document {
  background: #f1f5f9 !important;
}
.file-name-overlay {
  position: absolute !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: rgba(15, 23, 42, 0.7) !important;
  color: white !important;
  font-size: 0.55rem !important;
  padding: 0.15rem 0.25rem !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  font-weight: 600 !important;
}
.quick-delete-btn {
  position: absolute !important;
  top: 0.25rem !important;
  right: 0.25rem !important;
  width: 1.25rem !important;
  height: 1.25rem !important;
  border-radius: 50% !important;
  background: rgba(239, 68, 68, 0.9) !important;
  color: white !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: none !important;
  cursor: pointer !important;
}
.att-inputs-column {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.4rem !important;
}
.att-caption-input {
  width: 100% !important;
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #e2e8f0 !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  color: #334155 !important;
  padding: 0.2rem 0 !important;
  outline: none !important;
}
.att-caption-input:focus {
  border-color: #6366f1 !important;
}
.att-loc-wrapper {
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
}
:deep(.att-location-input) {
  flex: 1 !important;
}
:deep(.att-location-input input) {
  border: none !important;
  background: transparent !important;
  padding: 0.1rem 0 !important;
  font-size: 0.7rem !important;
  font-weight: 600 !important;
  color: #64748b !important;
}
:deep(.att-location-input input:focus) {
  box-shadow: none !important;
}
</style>
