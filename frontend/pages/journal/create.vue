<template>
  <div class="mso-journal writing-zen-mode">
    <div class="journal-bg"></div>
    
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] right-[-10%] w-[50rem] h-[40rem] bg-indigo-300/15 rounded-full blur-[140px] animate-pulse" style="animation-duration: 9s;"></div>
      <div class="absolute bottom-[10%] left-[-10%] w-[40rem] h-[30rem] bg-fuchsia-300/15 rounded-full blur-[120px] animate-pulse" style="animation-duration: 11s;"></div>
    </div>

    <!-- Top Navigation Header -->
    <header class="zen-header relative z-10 py-5 border-b border-slate-200/50 bg-white/40 backdrop-blur-md">
      <div class="container mx-auto px-6 flex items-center justify-between">
        <NuxtLink to="/journal" class="zen-back-btn group">
          <Icon name="lucide:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Quitter l'éditeur</span>
        </NuxtLink>
        
        <div class="zen-brand">
          <div class="zen-pulse-dot"></div>
          <Icon name="lucide:feather" class="w-5 h-5 text-indigo-500 animate-bounce" />
          <span class="font-display font-extrabold text-slate-800 tracking-tight">MSO20s Writing Studio</span>
        </div>

        <div class="zen-actions-top">
          <span class="draft-autosave-indicator" :class="{ 'saving': isSavingDraft }">
            <Icon :name="isSavingDraft ? 'lucide:loader-2' : 'lucide:cloud-check'" :class="{ 'spin': isSavingDraft }" class="w-4 h-4" />
            <span>{{ draftStatusText }}</span>
          </span>
        </div>
      </div>
    </header>

    <!-- Main Workspace (Single Column Clean Layout) -->
    <main class="container mx-auto px-6 py-8 flex-1 relative z-10 max-w-4xl flex flex-col gap-6">
      
      <!-- Mode Tabs: Editor vs Live Preview -->
      <div class="tabs-navigation-bar mx-auto">
        <button 
          type="button" 
          class="tab-nav-item" 
          :class="{ 'active': activeTab === 'editor' }"
          @click="activeTab = 'editor'"
        >
          <Icon name="lucide:pen-line" class="w-4.5 h-4.5" />
          <span>Écriture</span>
        </button>
        <button 
          type="button" 
          class="tab-nav-item" 
          :class="{ 'active': activeTab === 'preview' }"
          @click="activeTab = 'preview'"
        >
          <Icon name="lucide:eye" class="w-4.5 h-4.5" />
          <span>Aperçu en Temps Réel</span>
        </button>
      </div>

      <!-- TAB 1: FOCUS WRITER -->
      <div v-show="activeTab === 'editor'" class="editor-pane-container max-w-3xl mx-auto w-full">
        <div class="composer-card">
          <div class="composer-container">
            <!-- Composer Header -->
            <div class="composer-header">
              <div class="user-avatar-wrapper">
                <div class="composer-avatar">
                  <Icon name="lucide:user" class="avatar-icon" />
                </div>
                <div class="composer-avatar-glowing-ring"></div>
              </div>
              
              <div class="composer-main-inputs">
                <!-- Title Input Field -->
                <div class="title-field-wrapper">
                  <input 
                    v-model="title" 
                    type="text" 
                    class="composer-title-input" 
                    placeholder="Donnez un titre à cette aventure..." 
                    maxlength="80"
                    @input="queueDraftSave"
                  />
                </div>

                <!-- Textarea for the Story -->
                <textarea 
                  ref="textareaRef"
                  v-model="caption" 
                  class="composer-textarea" 
                  placeholder="Racontez votre moment ici... Les sommets gravis, les galères drôles, les bivouacs étoilés." 
                  rows="6"
                  @input="onTextareaInput"
                ></textarea>

                <!-- METADATA GRID (Lieu, Date, Heure) -->
                <div class="metadata-form-grid mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-4">
                  <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Icon name="lucide:sliders-horizontal" class="w-4 h-4 text-indigo-500" />
                    Détails et Météo de l'aventure
                  </h4>
                  
                  <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <!-- Lieu principal -->
                    <div class="md:col-span-6 flex flex-col gap-1.5">
                      <label class="text-xs font-extrabold text-slate-600 flex items-center gap-1">
                        <Icon name="lucide:map-pin" class="w-3.5 h-3.5 text-slate-400" />
                        Lieu principal (GPS réanalysé)
                      </label>
                      <div class="location-field-wrapper-embedded">
                        <LocationAutocomplete 
                          v-model="location" 
                          placeholder="Où était-ce ? (Ex: Lac d'Annecy...)" 
                          class="composer-location-input-field-embedded"
                          @update:modelValue="queueDraftSave"
                        />
                      </div>
                    </div>

                    <!-- Date de l'aventure -->
                    <div class="md:col-span-3 flex flex-col gap-1.5">
                      <label class="text-xs font-extrabold text-slate-600 flex items-center gap-1">
                        <Icon name="lucide:calendar" class="w-3.5 h-3.5 text-slate-400" />
                        Date du souvenir
                      </label>
                      <input 
                        type="date" 
                        v-model="eventDate" 
                        class="embedded-metadata-input"
                        @input="queueDraftSave" 
                      />
                    </div>

                    <!-- Heure précise (Optionnelle) -->
                    <div class="md:col-span-3 flex flex-col gap-1.5">
                      <label class="text-xs font-extrabold text-slate-600 flex items-center gap-1">
                        <Icon name="lucide:clock" class="w-3.5 h-3.5 text-slate-400" />
                        Heure précise <span class="text-slate-400 font-medium">(opt.)</span>
                      </label>
                      <input 
                        type="time" 
                        v-model="eventTime" 
                        class="embedded-metadata-input"
                        @input="queueDraftSave" 
                      />
                    </div>
                  </div>

                  <!-- Open-Meteo Automatic enrichment notice -->
                  <div class="weather-automation-notice mt-2 flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/50 text-xs text-slate-600">
                    <Icon name="lucide:cloud-lightning" class="w-5 h-5 text-indigo-500 flex-shrink-0 animate-pulse mt-0.5" />
                    <div>
                      <span class="font-bold text-slate-800">Météo historique automatisée :</span>
                      En fournissant un lieu et une date, notre service interrogera automatiquement l'API <strong>Open-Meteo</strong> pour récupérer les conditions climatiques exactes (température et ciel) de cette journée passée !
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Media Attachment Section -->
            <div class="composer-attachments-section">
              <div class="attachments-upload-header-row">
                <h4 class="attachments-heading">
                  <Icon name="lucide:paperclip" class="w-4 h-4 text-indigo-500" />
                  Médias et pièces jointes ({{ attachments.length }})
                </h4>
                <button type="button" class="upload-trigger-inline-btn" @click="triggerFileInput">
                  <Icon name="lucide:plus" class="w-4 h-4" />
                  <span>Ajouter</span>
                </button>
              </div>
              
              <!-- Silent File Input -->
              <input 
                ref="fileInput" 
                type="file" 
                class="hidden" 
                multiple 
                accept="image/*,video/*,application/pdf" 
                @change="handleFileChange" 
              />

              <!-- Drag & Drop Zone -->
              <div 
                class="dropzone-zen" 
                @click="triggerFileInput"
                @dragover.prevent="isDragOver = true"
                @dragleave.prevent="isDragOver = false"
                @drop.prevent="handleFileDrop"
                :class="{ 'drag-over': isDragOver }"
              >
                <Icon name="lucide:cloud-upload" class="dropzone-icon" />
                <p v-if="!isDragOver">Glissez-déposez des fichiers ou <span>parcourez vos dossiers</span></p>
                <p v-else class="text-indigo-500 font-bold">Déposez pour ajouter instantanément !</p>
                <span class="dropzone-hint">Supporte Images, Vidéos (MP4) et documents PDF (Max 10 Mo)</span>
              </div>

              <!-- Horizontal Preview cards list -->
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
                      
                      <!-- Quick Delete button -->
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
                        @input="queueDraftSave"
                      />
                      <div class="att-loc-wrapper">
                        <Icon name="lucide:map-pin" class="w-3.5 h-3.5 text-slate-400" />
                        <LocationAutocomplete 
                          v-model="att.location" 
                          placeholder="Lieu de ce cliché..." 
                          class="att-location-input"
                          @update:modelValue="queueDraftSave"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Action button bar -->
            <div class="composer-footer justify-end">
              <button 
                type="button" 
                class="clear-draft-action-btn mr-auto text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5 text-sm font-semibold"
                v-if="title || caption || attachments.length > 0"
                @click="clearDraftConfirm"
              >
                <Icon name="lucide:trash-2" class="w-4 h-4" />
                <span>Effacer le brouillon</span>
              </button>

              <button 
                type="button"
                @click="handleSubmit" 
                class="composer-submit-btn px-8 py-3.5" 
                :disabled="isSubmitting || (!caption.trim() && !title.trim() && attachments.length === 0)"
              >
                <Icon :name="isSubmitting ? 'lucide:loader-2' : 'lucide:send-horizontal'" :class="{ 'spin': isSubmitting }" class="w-5 h-5" />
                <span>{{ isSubmitting ? 'Publication...' : 'Publier sur le Journal' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: LIVE SIMULATION DISPLAY -->
      <div v-show="activeTab === 'preview'" class="preview-pane-container max-w-3xl mx-auto w-full">
        <div class="preview-explanation-banner">
          <Icon name="lucide:smartphone" class="w-6 h-6 text-indigo-500" />
          <div>
            <h4 class="font-bold text-slate-800">Simulateur Mobile Live</h4>
            <p class="text-sm text-slate-500">Voici exactement comment votre publication apparaîtra dans le flux pour les autres utilisateurs.</p>
          </div>
        </div>

        <div class="mobile-phone-simulator">
          <div class="simulator-screen">
            <div class="simulator-app-header">
              <span class="font-display font-black text-slate-800">MSO20s Feed</span>
              <Icon name="lucide:bell" class="w-4 h-4 text-slate-600" />
            </div>
            <div class="simulator-content-area">
              <JournalPostCard :post="mockPost" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRichPosts } from '~/composables/useRichPosts';
import { useAuth } from '~/composables/useAuth';
import JournalPostCard from '~/components/journal/JournalPostCard.vue';

// Disable default global layout
definePageMeta({
  layout: false
});

const { createRichPost } = useRichPosts();
const { user } = useAuth();

// Editor core fields
const title = ref('');
const caption = ref('');
const location = ref('');
const eventDate = ref('');
const eventTime = ref('');
const attachments = ref<any[]>([]);

// Page Layout local states
const activeTab = ref<'editor' | 'preview'>('editor');
const isDragOver = ref(false);
const fileInput = ref<HTMLInputElement>();
const textareaRef = ref<HTMLTextAreaElement>();
const isSubmitting = ref(false);

// Draft auto-save states
const isSavingDraft = ref(false);
const draftStatusText = ref('Brouillon à jour');
let autoSaveTimeout: any = null;

// Live Mock Post data feeding the Mobile Simulator
const mockPost = computed(() => {
  return {
    id: 9999,
    title: title.value || 'Une superbe aventure',
    caption: caption.value || 'Racontez votre incroyable histoire...',
    location: location.value,
    event_date: eventDate.value,
    event_time: eventTime.value,
    weather_info: eventDate.value && location.value ? '☀️ Tempête de ciel bleu (Simulation)' : null,
    created_at: new Date().toISOString(),
    author: {
      username: user.value?.username || 'Antoine'
    },
    attachments: attachments.value.map((att, idx) => ({
      id: idx,
      file_url: att.previewUrl,
      file_type: att.fileType,
      file_name: att.file.name,
      caption: att.caption,
      location: att.location
    }))
  };
});

// Textarea auto-expanding heights
const onTextareaInput = () => {
  adjustTextareaHeight();
  queueDraftSave();
};

const adjustTextareaHeight = () => {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${Math.min(el.scrollHeight, 400)}px`;
};

// File handlers
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
    attachments.value.push({
      file,
      previewUrl,
      fileType,
      caption: '',
      location: ''
    });
  }
  queueDraftSave();
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
  URL.revokeObjectURL(attachments.value[index].previewUrl);
  attachments.value.splice(index, 1);
  queueDraftSave();
};

// Auto-save local draft system
const queueDraftSave = () => {
  draftStatusText.value = 'Modifications en cours...';
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(saveDraftToLocalStorage, 1500);
};

const saveDraftToLocalStorage = () => {
  isSavingDraft.value = true;
  draftStatusText.value = 'Sauvegarde...';
  
  const draftData = {
    title: title.value,
    caption: caption.value,
    location: location.value,
    eventDate: eventDate.value,
    eventTime: eventTime.value
  };

  localStorage.setItem('mso_journal_draft_zen', JSON.stringify(draftData));
  
  setTimeout(() => {
    isSavingDraft.value = false;
    draftStatusText.value = 'Brouillon enregistré localement';
  }, 400);
};

const loadDraftFromLocalStorage = () => {
  const saved = localStorage.getItem('mso_journal_draft_zen');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      title.value = data.title || '';
      caption.value = data.caption || '';
      location.value = data.location || '';
      eventDate.value = data.eventDate || '';
      eventTime.value = data.eventTime || '';
      
      setTimeout(() => {
        adjustTextareaHeight();
      }, 100);
    } catch (e) {
      console.error('Erreur de chargement du brouillon:', e);
    }
  }
};

const clearDraftConfirm = () => {
  if (confirm('Voulez-vous vraiment effacer entièrement votre brouillon actuel ?')) {
    title.value = '';
    caption.value = '';
    location.value = '';
    eventDate.value = '';
    eventTime.value = '';
    attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
    attachments.value = [];
    localStorage.removeItem('mso_journal_draft_zen');
    draftStatusText.value = 'Brouillon effacé';
    if (textareaRef.value) textareaRef.value.style.height = 'auto';
  }
};

// Form submission handler
const handleSubmit = async () => {
  isSubmitting.value = true;
  const fd = new FormData();
  
  fd.append('title', title.value);
  fd.append('caption', caption.value);
  fd.append('location', location.value);
  fd.append('event_date', eventDate.value);
  fd.append('event_time', eventTime.value);
  
  attachments.value.forEach((att, index) => {
    fd.append(`file_${index}`, att.file);
    fd.append(`caption_${index}`, att.caption);
    fd.append(`location_${index}`, att.location);
  });

  if (await createRichPost(fd)) {
    // Clear draft storage and local states
    localStorage.removeItem('mso_journal_draft_zen');
    attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
    attachments.value = [];
    
    // Redirect back to main feed
    navigateTo('/journal');
  } else {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  loadDraftFromLocalStorage();
  
  // Set default date to today if empty draft
  if (!eventDate.value) {
    const today = new Date().toISOString().split('T')[0];
    eventDate.value = today;
  }
});

onBeforeUnmount(() => {
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
  attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
});

useSeoMeta({ title: 'MSO20s Studio - Écrire une page' });
</script>

<style scoped>
@import '~/assets/css/journal.css';

/* Custom Workspace elements styling */
.writing-zen-mode {
  padding-top: 0 !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.zen-header {
  border-b: 1px solid rgba(226, 232, 240, 0.5);
  z-index: 100;
}

.zen-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-weight: 800;
  color: #475569;
  font-size: 0.95rem;
}

.zen-back-btn:hover {
  color: #6366f1;
}

.zen-brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.05rem;
  position: relative;
}

.zen-pulse-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulseLight 2s infinite;
}

@keyframes pulseLight {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.draft-autosave-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.825rem;
  font-weight: 700;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  transition: all 0.2s;
}

.draft-autosave-indicator.saving {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.08);
}

/* Tabs */
.tabs-navigation-bar {
  display: flex;
  gap: 0.5rem;
  padding: 0.35rem;
  background: #f1f5f9;
  border-radius: 14px;
  width: fit-content;
  border: 1px solid rgba(226, 232, 240, 0.5);
}

.tab-nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 800;
  color: #64748b;
  border-radius: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.tab-nav-item:hover {
  color: #0f172a;
}

.tab-nav-item.active {
  color: #6366f1;
  background: white;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
}

/* Drag and drop zone */
.dropzone-zen {
  border: 2px dashed #cbd5e1;
  border-radius: 18px;
  padding: 2.25rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  background: rgba(99, 102, 241, 0.01);
  margin-top: 1rem;
}

.dropzone-zen:hover, .dropzone-zen.drag-over {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.03);
}

.dropzone-icon {
  font-size: 2.25rem;
  color: #6366f1;
  margin-bottom: 0.5rem;
  transition: transform 0.25s;
}

.dropzone-zen:hover .dropzone-icon {
  transform: translateY(-2px);
}

.dropzone-zen p {
  font-size: 0.95rem;
  font-weight: 700;
  color: #475569;
}

.dropzone-zen p span {
  color: #6366f1;
  text-decoration: underline;
}

.dropzone-hint {
  display: block;
  font-size: 0.775rem;
  color: #94a3b8;
  margin-top: 0.35rem;
  font-weight: 600;
}

.attachments-upload-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
}

.upload-trigger-inline-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 800;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.06);
  border: none;
  padding: 0.45rem 0.85rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-trigger-inline-btn:hover {
  background: rgba(99, 102, 241, 0.12);
  transform: scale(1.02);
}

/* Interactive Preview pane */
.preview-pane-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.4s ease-out;
}

.preview-explanation-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 1.25rem 1.5rem;
  border-radius: 18px;
}

.mobile-phone-simulator {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  background: #0f172a;
  border: 12px solid #1e293b;
  border-radius: 40px;
  box-shadow: 
    0 25px 60px -15px rgba(15, 23, 42, 0.3),
    0 0 0 1px rgba(255,255,255,0.05);
  overflow: hidden;
  aspect-ratio: 9/16;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.simulator-screen {
  flex: 1;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.simulator-app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem 0.85rem;
  background: white;
  border-bottom: 1px solid #f1f5f9;
}

.simulator-content-area {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

/* Embedded metadata inputs */
.metadata-form-grid {
  transition: all 0.3s;
}

.location-field-wrapper-embedded {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.65rem 0.85rem;
  transition: border-color 0.2s;
}

.location-field-wrapper-embedded:focus-within {
  border-color: #6366f1;
}

.composer-location-input-field-embedded :deep(input) {
  width: 100%;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
  padding: 0 !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  color: #1e293b !important;
}

.embedded-metadata-input {
  background: white !important;
  border: 1.5px solid #e2e8f0 !important;
  border-radius: 12px !important;
  padding: 0.65rem 0.85rem !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  color: #1e293b !important;
  outline: none !important;
  box-shadow: none !important;
  transition: border-color 0.2s;
}

.embedded-metadata-input:focus {
  border-color: #6366f1 !important;
}

.weather-automation-notice {
  line-height: 1.5;
}
</style>
