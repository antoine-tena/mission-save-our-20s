<template>
  <div class="mso-journal writing-zen-mode">
    <div class="journal-bg"></div>
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] right-[-10%] w-[50rem] h-[40rem] bg-indigo-300/10 rounded-full blur-[140px] animate-pulse" style="animation-duration: 9s;"></div>
      <div class="absolute bottom-[10%] left-[-10%] w-[40rem] h-[30rem] bg-fuchsia-300/10 rounded-full blur-[120px] animate-pulse" style="animation-duration: 11s;"></div>
    </div>

    <!-- Mère/Daughter Custom Zen Header -->
    <ZenEditorHeader 
      :draft-status-text="draftStatusText"
      :is-saving-draft="isSavingDraft"
      :is-submitting="isSubmitting"
      :is-disabled="isSubmitting || (!caption.trim() && !title.trim() && attachments.length === 0)"
      @publish="handleSubmit"
    />

    <!-- Bulletproof layout spacer -->
    <div class="h-10 w-full relative z-10 flex-shrink-0"></div>

    <!-- Main Workspace -->
    <main class="container mx-auto px-6 pb-6 flex-1 relative z-10 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-[calc(100vh-140px)] overflow-hidden">
      <!-- LEFT SECTION: CREATIVE WRITING CANVAS (7 Cols on Desktop) -->
      <section class="lg:col-span-7 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
        <div class="editor-canvas-card">
          <!-- Text and Notion Property Row (Fille) -->
          <ZenEditorForm 
            ref="editorFormRef"
            v-model:title="title"
            v-model:caption="caption"
            v-model:location="location"
            v-model:eventDate="eventDate"
            v-model:eventTime="eventTime"
            :has-attachments="attachments.length > 0"
            @clear="clearDraftConfirm"
            @update:title="queueDraftSave"
            @update:caption="queueDraftSave"
            @update:location="queueDraftSave"
            @update:eventDate="queueDraftSave"
            @update:eventTime="queueDraftSave"
          />

          <!-- Media Attachments Row (Fille) -->
          <ZenEditorAttachments 
            v-model="attachments" 
            @update:modelValue="queueDraftSave"
          />
        </div>
      </section>

      <!-- RIGHT SECTION: LIVE MOBILE SANDBOX SIMULATOR (Fille) -->
      <ZenEditorSimulator :mock-post="mockPost" />
    </main>

    <!-- Mobile-only floating Preview Toggle Button -->
    <div class="lg:hidden fixed bottom-6 right-6 z-50">
      <button 
        type="button" 
        class="mobile-preview-toggle-btn shadow-lg bg-indigo-600 text-white p-4 rounded-full flex items-center gap-2 font-bold"
        @click="toggleMobilePreview"
      >
        <Icon :name="activeTab === 'editor' ? 'lucide:eye' : 'lucide:pen-line'" class="w-5 h-5" />
        <span>{{ activeTab === 'editor' ? 'Aperçu' : 'Écrire' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import ZenEditorHeader from '~/components/journal/ZenEditorHeader.vue';
import ZenEditorForm from '~/components/journal/ZenEditorForm.vue';
import ZenEditorAttachments from '~/components/journal/ZenEditorAttachments.vue';
import ZenEditorSimulator from '~/components/journal/ZenEditorSimulator.vue';

definePageMeta({ layout: false });

const { createRichPost } = useRichPosts();
const { user } = useAuth();

// Core states
const title = ref('');
const caption = ref('');
const location = ref('');
const eventDate = ref('');
const eventTime = ref('');
const attachments = ref<any[]>([]);

const activeTab = ref<'editor' | 'preview'>('editor');
const isSubmitting = ref(false);
const editorFormRef = ref<any>(null);

// Draft states
const isSavingDraft = ref(false);
const draftStatusText = ref('Brouillon à jour');
let autoSaveTimeout: any = null;

const mockPost = computed(() => {
  return {
    id: 9999,
    title: title.value || 'Une superbe aventure',
    caption: caption.value || 'Racontez votre incroyable histoire...',
    location: location.value,
    event_date: eventDate.value,
    event_time: eventTime.value,
    weather_info: eventDate.value && location.value ? '☀️ 18.5°C - Ciel dégagé (Aperçu)' : null,
    created_at: new Date().toISOString(),
    author: { username: user?.value?.username || 'Antoine' },
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

const toggleMobilePreview = () => {
  activeTab.value = activeTab.value === 'editor' ? 'preview' : 'editor';
};

const queueDraftSave = () => {
  draftStatusText.value = 'Brouillon en cours de modification...';
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(saveDraftToLocalStorage, 1500);
};

const saveDraftToLocalStorage = () => {
  isSavingDraft.value = true;
  draftStatusText.value = 'Sauvegarde...';
  localStorage.setItem('mso_journal_draft_zen_v2', JSON.stringify({
    title: title.value, caption: caption.value, location: location.value, eventDate: eventDate.value, eventTime: eventTime.value
  }));
  setTimeout(() => {
    isSavingDraft.value = false;
    draftStatusText.value = 'Brouillon enregistré localement';
  }, 400);
};

const loadDraftFromLocalStorage = () => {
  const saved = localStorage.getItem('mso_journal_draft_zen_v2');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      title.value = data.title || '';
      caption.value = data.caption || '';
      location.value = data.location || '';
      eventDate.value = data.eventDate || '';
      eventTime.value = data.eventTime || '';
      setTimeout(() => editorFormRef.value?.adjustTextareaHeight(), 100);
    } catch (e) {
      console.error('Erreur de chargement du brouillon:', e);
    }
  }
};

const clearDraftConfirm = () => {
  if (confirm('Voulez-vous vraiment effacer entièrement votre brouillon actuel ?')) {
    title.value = ''; caption.value = ''; location.value = ''; eventDate.value = ''; eventTime.value = '';
    attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
    attachments.value = [];
    localStorage.removeItem('mso_journal_draft_zen_v2');
    draftStatusText.value = 'Brouillon effacé';
    editorFormRef.value?.adjustTextareaHeight();
  }
};

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
    localStorage.removeItem('mso_journal_draft_zen_v2');
    attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
    attachments.value = [];
    navigateTo('/journal');
  } else {
    isSubmitting.value = false;
  }
};

const preventGlobalDragDrop = (e: DragEvent) => {
  if (e.target && !(e.target as HTMLElement).closest('.dropzone-zen')) {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'none';
      e.dataTransfer.dropEffect = 'none';
    }
  }
};

onMounted(() => {
  loadDraftFromLocalStorage();
  if (!eventDate.value) {
    eventDate.value = new Date().toISOString().split('T')[0];
  }
  window.addEventListener('dragover', preventGlobalDragDrop);
  window.addEventListener('drop', preventGlobalDragDrop);
});

onBeforeUnmount(() => {
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
  attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
  window.removeEventListener('dragover', preventGlobalDragDrop);
  window.removeEventListener('drop', preventGlobalDragDrop);
});

useSeoMeta({ title: 'MSO20s Creative Studio - Écrire' });
</script>

<style>
@import '~/assets/css/journal.css';

.writing-zen-mode {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  height: 100vh;
  overflow: hidden;
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
  font-size: 0.95rem;
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

@media (max-width: 1023px) {
  main {
    height: auto !important;
    overflow: visible !important;
  }
}
</style>
