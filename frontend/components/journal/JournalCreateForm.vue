<template>
  <section class="glass-card form-section">
    <h2>Écrire une nouvelle page</h2>
    <form @submit.prevent="handleSubmit" class="journal-form">
      <div class="form-group">
        <label>Titre de l'aventure <span class="optional">(optionnel)</span></label>
        <input v-model="title" type="text" placeholder="Ex: Notre week-end fou au Semnoz..." />
      </div>
      <div class="form-row">
        <div class="form-group flex-2">
          <label>Description globale <span class="optional">(optionnel)</span></label>
          <textarea v-model="caption" placeholder="Racontez ce moment incroyable, votre ressenti, des blagues de prépa..." rows="3"></textarea>
        </div>
        <div class="form-group flex-1">
          <label>Lieu principal <span class="optional">(optionnel)</span></label>
          <LocationAutocomplete v-model="location" placeholder="Ex: Lac d'Annecy" />
        </div>
      </div>
      <!-- Attachments Section -->
      <div class="attachments-upload">
        <h3>Fichiers et pièces jointes multimédias</h3>
        <p class="upload-hint">Ajoutez autant de photos, vidéos, PDFs ou documents que vous souhaitez. Tout est optionnel !</p>
        
        <div class="dropzone" @click="triggerFileInput">
          <Icon name="lucide:cloud-upload" class="upload-icon" />
          <p>Cliquez pour ajouter des fichiers (Images, Vidéos, PDFs, etc.)</p>
          <input 
            ref="fileInput" 
            type="file" 
            class="hidden" 
            multiple 
            accept="image/*,video/*,application/pdf" 
            @change="handleFileChange" 
          />
        </div>
        <!-- Attachment list inside form -->
        <div v-if="attachments.length > 0" class="attachments-list">
          <div v-for="(att, idx) in attachments" :key="idx" class="att-form-card glass-card">
            <div class="att-preview-box">
              <img v-if="att.fileType === 'IMAGE'" :src="att.previewUrl" class="preview-img" />
              <div v-else-if="att.fileType === 'VIDEO'" class="preview-placeholder video">
                <Icon name="lucide:video" />
              </div>
              <div v-else-if="att.fileType === 'PDF'" class="preview-placeholder pdf">
                <Icon name="lucide:file-text" />
              </div>
              <div v-else class="preview-placeholder generic">
                <Icon name="lucide:file" />
              </div>
              <span class="file-name-badge">{{ att.file.name }}</span>
            </div>
            <div class="att-metadata-fields">
              <div class="form-group">
                <input v-model="att.caption" type="text" placeholder="Légende ou description de ce fichier..." />
              </div>
              <div class="form-group">
                <LocationAutocomplete v-model="att.location" placeholder="Lieu spécifique..." />
              </div>
            </div>
            <button type="button" class="btn-remove-att" @click="removeAttachment(idx)">
              <Icon name="lucide:trash-2" />
            </button>
          </div>
        </div>
      </div>
      <button type="submit" class="btn-submit" :disabled="isSubmitting">
        <Icon :name="isSubmitting ? 'lucide:loader-2' : 'lucide:send'" :class="{ 'spin': isSubmitting }" />
        <span>{{ isSubmitting ? 'Publication en cours...' : 'Graver dans le journal' }}</span>
      </button>
    </form>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['submit']);
const title = ref('');
const caption = ref('');
const location = ref('');
interface FileItem {
  file: File;
  previewUrl: string;
  fileType: 'IMAGE' | 'VIDEO' | 'PDF' | 'OTHER';
  caption: string;
  location: string;
}
const attachments = ref<FileItem[]>([]);
const fileInput = ref<HTMLInputElement>();
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
  attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
  attachments.value = [];
  isSubmitting.value = false;
};
defineExpose({ resetForm });
</script>