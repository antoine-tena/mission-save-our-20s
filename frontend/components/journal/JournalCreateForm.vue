<template>
  <section class="composer-card">
    <div class="composer-container">
      <!-- Composer Header/User Row -->
      <div class="composer-header">
        <div class="user-avatar-wrapper">
          <div class="composer-avatar">
            <Icon name="lucide:user" class="avatar-icon" />
          </div>
          <div class="composer-avatar-glowing-ring"></div>
        </div>
        
        <div class="composer-main-inputs">
          <!-- Optional Title Field (can be toggled or shown) -->
          <Transition name="slide-up">
            <div v-if="showTitleField" class="title-field-wrapper">
              <input 
                v-model="title" 
                type="text" 
                class="composer-title-input" 
                placeholder="Donnez un titre à cette page (Optionnel)..." 
                maxlength="80"
              />
            </div>
          </Transition>

          <!-- Textarea (Caption) -->
          <textarea 
            ref="textareaRef"
            v-model="caption" 
            class="composer-textarea" 
            placeholder="Quoi de neuf ? Partagez un souvenir, une rando, des photos..." 
            rows="3"
            @input="adjustTextareaHeight"
          ></textarea>

          <!-- Inline Location Badges or Inputs -->
          <Transition name="slide-up">
            <div v-if="showLocationField" class="location-field-wrapper">
              <Icon name="lucide:map-pin" class="loc-input-icon" />
              <LocationAutocomplete 
                v-model="location" 
                placeholder="Où était-ce ? (Ex: Lac d'Annecy...)" 
                class="composer-location-input-field"
              />
            </div>
          </Transition>
        </div>
      </div>

      <!-- Attachment list (Media Grid) inside composer -->
      <Transition name="slide-up">
        <div v-if="attachments.length > 0" class="composer-attachments-section">
          <h4 class="attachments-heading">
            <Icon name="lucide:paperclip" class="w-4 h-4 text-indigo-500 animate-pulse" />
            Fichiers joints ({{ attachments.length }})
          </h4>
          <div class="composer-attachments-grid">
            <div v-for="(att, idx) in attachments" :key="idx" class="composer-att-card">
              <div class="att-media-preview">
                <img v-if="att.fileType === 'IMAGE'" :src="att.previewUrl" class="att-preview-img" />
                <div v-else-if="att.fileType === 'VIDEO'" class="att-preview-placeholder video">
                  <Icon name="lucide:video" class="w-8 h-8 text-indigo-500" />
                </div>
                <div v-else class="att-preview-placeholder document">
                  <Icon name="lucide:file-text" class="w-8 h-8 text-slate-500" />
                </div>
                <div class="file-name-overlay">{{ att.file.name }}</div>
                
                <!-- Quick delete button -->
                <button type="button" class="quick-delete-btn" @click="removeAttachment(idx)" title="Supprimer">
                  <Icon name="lucide:x" class="w-4 h-4" />
                </button>
              </div>
              
              <div class="att-inputs-column">
                <input 
                  v-model="att.caption" 
                  type="text" 
                  class="att-caption-input" 
                  placeholder="Légende pour ce fichier..." 
                />
                <div class="att-loc-wrapper">
                  <Icon name="lucide:map-pin" class="w-3.5 h-3.5 text-slate-400" />
                  <LocationAutocomplete 
                    v-model="att.location" 
                    placeholder="Lieu spécifique..." 
                    class="att-location-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Composer Footer/Toolbar -->
      <div class="composer-footer">
        <!-- Interactive Tool Buttons -->
        <div class="composer-toolbar">
          <!-- Photo/Media Upload button -->
          <button 
            type="button" 
            class="toolbar-btn" 
            @click="triggerFileInput" 
            title="Ajouter des médias (Images, Vidéos, PDFs...)"
            :class="{ 'active': attachments.length > 0 }"
          >
            <Icon name="lucide:image" class="w-5.5 h-5.5" />
          </button>
          <input 
            ref="fileInput" 
            type="file" 
            class="hidden" 
            multiple 
            accept="image/*,video/*,application/pdf" 
            @change="handleFileChange" 
          />

          <!-- Toggle Location Field button -->
          <button 
            type="button" 
            class="toolbar-btn" 
            @click="showLocationField = !showLocationField" 
            title="Ajouter un lieu principal"
            :class="{ 'active': showLocationField || location }"
          >
            <Icon name="lucide:map-pin" class="w-5.5 h-5.5" />
          </button>

          <!-- Toggle Title Field button -->
          <button 
            type="button" 
            class="toolbar-btn" 
            @click="showTitleField = !showTitleField" 
            title="Ajouter un titre"
            :class="{ 'active': showTitleField || title }"
          >
            <Icon name="lucide:heading" class="w-5.5 h-5.5" />
          </button>
        </div>

        <!-- Submit Button -->
        <button 
          type="button"
          @click="handleSubmit" 
          class="composer-submit-btn" 
          :disabled="isSubmitting || (!caption.trim() && !title.trim() && attachments.length === 0)"
        >
          <Icon :name="isSubmitting ? 'lucide:loader-2' : 'lucide:send-horizontal'" :class="{ 'spin': isSubmitting }" class="w-4 h-4" />
          <span>{{ isSubmitting ? 'Publication...' : 'Publier' }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const title = ref('');
const caption = ref('');
const location = ref('');
const showLocationField = ref(false);
const showTitleField = ref(false);

interface FileItem {
  file: File;
  previewUrl: string;
  fileType: 'IMAGE' | 'VIDEO' | 'PDF' | 'OTHER';
  caption: string;
  location: string;
}

const attachments = ref<FileItem[]>([]);
const fileInput = ref<HTMLInputElement>();
const textareaRef = ref<HTMLTextAreaElement>();
const isSubmitting = ref(false);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  for (let i = 0; i < target.files.length; i++) {
    const file = target.files[i];
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
    attachments.value.push({
      file,
      previewUrl,
      fileType,
      caption: '',
      location: ''
    });
  }
};

const removeAttachment = (index: number) => {
  URL.revokeObjectURL(attachments.value[index].previewUrl);
  attachments.value.splice(index, 1);
};

const adjustTextareaHeight = () => {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${Math.min(el.scrollHeight, 300)}px`;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  const fd = new FormData();
  fd.append('title', title.value);
  fd.append('caption', caption.value);
  fd.append('location', location.value);
  attachments.value.forEach((att, index) => {
    fd.append(`file_${index}`, att.file);
    fd.append(`caption_${index}`, att.caption);
    fd.append(`location_${index}`, att.location);
  });
  emit('submit', fd);
};

const resetForm = () => {
  title.value = '';
  caption.value = '';
  location.value = '';
  showLocationField.value = false;
  showTitleField.value = false;
  attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
  attachments.value = [];
  isSubmitting.value = false;
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
  }
};

defineExpose({ resetForm });
</script>
