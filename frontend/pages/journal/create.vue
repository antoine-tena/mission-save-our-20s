<template>
  <div class="mso-journal writing-zen-mode">
    <div class="journal-bg"></div>
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] right-[-10%] w-[50rem] h-[40rem] bg-indigo-300/10 rounded-full blur-[140px] animate-pulse" style="animation-duration: 9s;"></div>
      <div class="absolute bottom-[10%] left-[-10%] w-[40rem] h-[30rem] bg-fuchsia-300/10 rounded-full blur-[120px] animate-pulse" style="animation-duration: 11s;"></div>
    </div>
    <!-- Modular Navigation Header -->
    <JournalEditorHeader
      :is-saving-draft="isSavingDraft"
      :draft-status-text="draftStatusText"
      :is-submitting="isSubmitting"
      :publish-disabled="!caption.trim() && !title.trim() && attachments.length === 0"
      @submit="handleSubmit"
    />
    <!-- Bulletproof layout spacer to force space under header -->
    <div class="h-10 w-full relative z-10 flex-shrink-0"></div>
    <!-- Main Workspace -->
    <main class="container mx-auto px-6 pb-6 flex-1 relative z-10 max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start h-[calc(100vh-140px)] overflow-hidden">
      <!-- LEFT SECTION: CREATIVE WRITING CANVAS -->
      <section class="md:col-span-7 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
        <JournalEditorComposer
          v-model:title="title"
          v-model:caption="caption"
          v-model:location="location"
          v-model:event-date="eventDate"
          v-model:event-time="eventTime"
          :attachments="attachments"
          @update:title="queueDraftSave"
          @update:caption="queueDraftSave"
          @update:location="queueDraftSave"
          @update:eventDate="queueDraftSave"
          @update:eventTime="queueDraftSave"
          @select-location="onLocationSelect"
          @clear-draft="clearDraftConfirm"
          @add-files="processFiles"
          @remove-attachment="removeAttachment"
          @update-attachment="updateAttachment"
        />
      </section>
      <!-- RIGHT SECTION: LIVE MOBILE SANDBOX SIMULATOR -->
      <JournalEditorSimulator :post="mockPost" />
    </main>
    <!-- Mobile-only floating Preview Toggle Button -->
    <div class="md:hidden fixed bottom-6 right-6 z-50">
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import JournalEditorHeader from '~/components/journal/JournalEditorHeader.vue';
import JournalEditorComposer from '~/components/journal/JournalEditorComposer.vue';
import JournalEditorSimulator from '~/components/journal/JournalEditorSimulator.vue';
import { fetchLiveWeather } from '~/utils/weather';
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

// GPS Coordinates and Live Weather for Mobile Simulator Preview
const selectedLatitude = ref<number | null>(null);
const selectedLongitude = ref<number | null>(null);
const simulatorWeatherInfo = ref<string | null>(null);

// Draft states
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
    weather_info: simulatorWeatherInfo.value || (eventDate.value && location.value ? '☁️ Recherche météo...' : null),
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
    attachments.value.push({ file, previewUrl, fileType, caption: '', location: '' });
  }
  queueDraftSave();
};

const removeAttachment = (index: number) => {
  URL.revokeObjectURL(attachments.value[index].previewUrl);
  attachments.value.splice(index, 1);
  queueDraftSave();
};

const updateAttachment = (data: { index: number; field: string; value: string }) => {
  if (attachments.value[data.index]) {
    attachments.value[data.index][data.field] = data.value;
    queueDraftSave();
  }
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
    title: title.value,
    caption: caption.value,
    location: location.value,
    eventDate: eventDate.value,
    eventTime: eventTime.value,
    lat: selectedLatitude.value,
    lon: selectedLongitude.value
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
      selectedLatitude.value = data.lat || null;
      selectedLongitude.value = data.lon || null;
      
      setTimeout(() => {
        if (selectedLatitude.value && selectedLongitude.value) {
          fetchLiveWeatherForSimulator();
        }
      }, 100);
    } catch (e) {
      console.error('Erreur de chargement du brouillon:', e);
    }
  }
};

const clearDraftConfirm = () => {
  if (confirm('Voulez-vous vraiment effacer entièrement votre brouillon actuel ?')) {
    title.value = ''; caption.value = ''; location.value = ''; eventDate.value = ''; eventTime.value = '';
    selectedLatitude.value = null; selectedLongitude.value = null; simulatorWeatherInfo.value = null;
    attachments.value.forEach(att => URL.revokeObjectURL(att.previewUrl));
    attachments.value = [];
    localStorage.removeItem('mso_journal_draft_zen_v2');
    draftStatusText.value = 'Brouillon effacé';
  }
};

const onLocationSelect = (data: { latitude: number; longitude: number; display_name: string }) => {
  selectedLatitude.value = data.latitude;
  selectedLongitude.value = data.longitude;
  fetchLiveWeatherForSimulator();
  queueDraftSave();
};

const fetchLiveWeatherForSimulator = async () => {
  simulatorWeatherInfo.value = '☁️ Recherche météo...';
  const info = await fetchLiveWeather(
    selectedLatitude.value,
    selectedLongitude.value,
    location.value,
    eventDate.value,
    eventTime.value
  );
  simulatorWeatherInfo.value = info;
};

watch([eventDate, eventTime, location], () => {
  fetchLiveWeatherForSimulator();
});

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
</style>
