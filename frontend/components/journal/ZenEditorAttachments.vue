<template>
  <div class="composer-attachments-section mt-6 p-6 rounded-2xl border border-dashed border-slate-200">
    <div class="attachments-upload-header-row flex items-center justify-between">
      <h4 class="attachments-heading text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 m-0">
        <Icon name="lucide:paperclip" class="w-4 h-4 text-indigo-500" />
        Médias &amp; Documents joints ({{ modelValue.length }})
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
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleFileDrop"
      :class="{ 'drag-over': isDragOver }"
    >
      <Icon name="lucide:cloud-upload" class="dropzone-icon" />
      <p v-if="!isDragOver">Glissez-déposez des clichés ou des fichiers ici</p>
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
      <div v-if="modelValue.length > 0" class="composer-attachments-grid mt-4">
        <div v-for="(att, idx) in modelValue" :key="idx" class="composer-att-card">
          <div class="att-media-preview">
            <img v-if="att.fileType === 'IMAGE'" :src="att.previewUrl" class="att-preview-img" />
            <div v-else-if="att.fileType === 'VIDEO'" class="att-preview-placeholder video">
              <Icon name="lucide:video" class="w-8 h-8 text-indigo-500 animate-pulse" />
            </div>
            <div v-else class="att-preview-placeholder document">
              <Icon name="lucide:file-text" class="w-8 h-8 text-slate-500" />
            </div>
            <div class="file-name-overlay">{{ att.file.name }}</div>
            
            <button type="button" class="quick-delete-btn" @click="removeAttachment(idx)" title="Supprimer">
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>
          
          <div class="att-inputs-column">
            <input 
              v-model="att.caption" 
              type="text" 
              class="att-caption-input" 
              placeholder="Ajoutez une légende pour ce fichier..." 
            />
            <div class="att-loc-wrapper">
              <Icon name="lucide:map-pin" class="w-3.5 h-3.5 text-slate-400" />
              <LocationAutocomplete 
                v-model="att.location" 
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

const modelValue = defineModel<any[]>({ default: () => [] });
const isDragOver = ref(false);
const fileInput = ref<HTMLInputElement>();

const triggerFileInput = () => {
  fileInput.value?.click();
};

const processFiles = (files: FileList) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const previewUrl = URL.createObjectURL(file);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    let fileType: 'IMAGE' | 'VIDEO' | 'PDF' | 'OTHER' = 'OTHER';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      fileType = 'IMAGE';
    } else if (['mp4', 'mov', 'avi', 'webm'].includes(ext)) {
      fileType = 'VIDEO';
    } else if (ext === 'pdf') {
      fileType = 'PDF';
    }
    modelValue.value.push({
      file,
      previewUrl,
      fileType,
      caption: '',
      location: ''
    });
  }
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) processFiles(target.files);
};

const handleFileDrop = (e: DragEvent) => {
  isDragOver.value = false;
  if (e.dataTransfer?.files) processFiles(e.dataTransfer.files);
};

const removeAttachment = (index: number) => {
  URL.revokeObjectURL(modelValue.value[index].previewUrl);
  modelValue.value.splice(index, 1);
};
</script>
