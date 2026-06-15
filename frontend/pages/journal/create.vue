<template>
  <div class="mso-journal writing-zen-mode">
    <div class="journal-bg"></div>
    
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] right-[-10%] w-[50rem] h-[40rem] bg-indigo-300/10 rounded-full blur-[140px] animate-pulse" style="animation-duration: 9s;"></div>
      <div class="absolute bottom-[10%] left-[-10%] w-[40rem] h-[30rem] bg-fuchsia-300/10 rounded-full blur-[120px] animate-pulse" style="animation-duration: 11s;"></div>
    </div>

    <!-- Top Navigation Header -->
    <header class="zen-header relative z-20 py-4 border-b border-slate-200/50 bg-white/60 backdrop-blur-lg">
      <div class="container mx-auto px-6 flex items-center justify-between">
        <NuxtLink to="/journal" class="zen-back-btn group">
          <Icon name="lucide:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform text-slate-500 group-hover:text-indigo-600" />
          <span class="text-slate-600 group-hover:text-indigo-600 font-bold transition-colors">Quitter l'éditeur</span>
        </NuxtLink>
        
        <div class="zen-brand">
          <div class="zen-pulse-dot"></div>
          <Icon name="lucide:feather" class="w-5 h-5 text-indigo-500 animate-bounce" />
          <span class="font-display font-extrabold text-slate-800 tracking-tight">MSO20s Creative Studio</span>
        </div>

        <div class="flex items-center gap-4">
          <span class="draft-autosave-indicator" :class="{ 'saving': isSavingDraft }">
            <Icon :name="isSavingDraft ? 'lucide:loader-2' : 'lucide:cloud-check'" :class="{ 'spin': isSavingDraft }" class="w-4 h-4" />
            <span>{{ draftStatusText }}</span>
          </span>
          
          <button 
            type="button"
            @click="handleSubmit" 
            class="publish-top-btn" 
            :disabled="isSubmitting || (!caption.trim() && !title.trim() && attachments.length === 0)"
          >
            <Icon :name="isSubmitting ? 'lucide:loader-2' : 'lucide:send-horizontal'" :class="{ 'spin': isSubmitting }" class="w-4 h-4" />
            <span>{{ isSubmitting ? 'Publication...' : 'Publier' }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Bulletproof layout spacer to force space under header -->
    <div class="h-10 w-full relative z-10 flex-shrink-0"></div>

    <!-- Main Workspace (Dual-Pane Side-by-Side Professional Layout) -->
    <main class="container mx-auto px-6 pb-6 flex-1 relative z-10 max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start h-[calc(100vh-140px)] overflow-hidden">
      <!-- LEFT SECTION: CREATIVE WRITING CANVAS (7 Cols on Desktop/Tablet) -->
      <section class="md:col-span-7 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
        <div class="editor-canvas-card">
          <!-- Text Editing Area -->
          <div class="editor-writing-area">
            <!-- Title Input -->
            <div class="editor-title-container">
              <input 
                v-model="title" 
                type="text" 
                class="editor-title-input" 
                placeholder="Le titre de votre aventure..." 
                maxlength="80"
                @input="queueDraftSave"
              />
            </div>

            <!-- Interactive Formatting Markdown Helper Toolbar -->
            <div class="markdown-toolbar">
              <button type="button" class="toolbar-tool-btn" @click="wrapText('**', '**')" title="Gras (Ctrl+B)">
                <Icon name="lucide:bold" class="w-4.5 h-4.5" />
              </button>
              <button type="button" class="toolbar-tool-btn" @click="wrapText('*', '*')" title="Italique (Ctrl+I)">
                <Icon name="lucide:italic" class="w-4.5 h-4.5" />
              </button>
              <button type="button" class="toolbar-tool-btn" @click="wrapText('> ', '')" title="Citation">
                <Icon name="lucide:quote" class="w-4.5 h-4.5" />
              </button>
              <button type="button" class="toolbar-tool-btn" @click="wrapText('`', '`')" title="Code">
                <Icon name="lucide:code" class="w-4.5 h-4.5" />
              </button>
              <button type="button" class="toolbar-tool-btn" @click="insertText('- ')" title="Liste à puces">
                <Icon name="lucide:list" class="w-4.5 h-4.5" />
              </button>
              
              <div class="toolbar-divider"></div>

              <!-- Clear Draft Action inside toolbar -->
              <button 
                type="button" 
                class="toolbar-tool-btn text-slate-400 hover:text-red-500 ml-auto" 
                v-if="title || caption || attachments.length > 0"
                @click="clearDraftConfirm"
                title="Effacer le brouillon"
              >
                <Icon name="lucide:trash-2" class="w-4.5 h-4.5" />
              </button>
            </div>

            <!-- Main Rich Textarea -->
            <div class="textarea-relative-wrapper">
              <textarea 
                ref="textareaRef"
                v-model="caption" 
                class="editor-textarea" 
                placeholder="Racontez votre moment ici... Laissez parler votre créativité !" 
                rows="8"
                @input="onTextareaInput"
                @keydown.ctrl.b.prevent="wrapText('**', '**')"
                @keydown.ctrl.i.prevent="wrapText('*', '*')"
              ></textarea>
              
              <!-- Character / Word Counter Gauge -->
              <div class="editor-stats-overlay">
                <span class="stat-bubble">{{ wordCount }} mots</span>
                <div class="stat-gauge-container" :title="`${charCount} caractères`">
                  <svg class="progress-ring" width="20" height="20">
                    <circle class="progress-ring__background" stroke="#e2e8f0" stroke-width="2" fill="transparent" r="8" cx="10" cy="10" />
                    <circle class="progress-ring__circle" :stroke="gaugeColor" stroke-width="2" :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset" fill="transparent" r="8" cx="10" cy="10" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- NOTION-STYLE COMPACT PROPERTIES GRID (Lieu, Date, Heure, Open-Meteo) -->
          <div class="properties-editor-box mt-6">
            <!-- Property Row: Lieu -->
            <div class="property-row">
              <div class="property-label">
                <Icon name="lucide:map-pin" class="property-icon text-indigo-500" />
                <span>Lieu de l'aventure</span>
              </div>
              <div class="property-value">
                <LocationAutocomplete 
                  v-model="location" 
                  placeholder="Ajouter un lieu principal..." 
                  class="property-input-autocomplete"
                  :show-icon="false"
                  @select="onLocationSelect"
                  @update:modelValue="queueDraftSave"
                />
              </div>
            </div>

            <!-- Property Row: Date -->
            <div class="property-row">
              <div class="property-label">
                <Icon name="lucide:calendar" class="property-icon text-fuchsia-500" />
                <span>Date du souvenir</span>
              </div>
              <div class="property-value">
                <input 
                  type="date" 
                  v-model="eventDate" 
                  class="property-input-field"
                  @input="queueDraftSave" 
                />
              </div>
            </div>

            <!-- Property Row: Heure -->
            <div class="property-row">
              <div class="property-label">
                <Icon name="lucide:clock" class="property-icon text-amber-500" />
                <span>Heure précise (opt.)</span>
              </div>
              <div class="property-value">
                <input 
                  type="time" 
                  v-model="eventTime" 
                  class="property-input-field"
                  @input="queueDraftSave" 
                />
              </div>
            </div>

            <!-- Tiny inline Open-Meteo automation row -->
            <div class="property-row inline-automation-row">
              <div class="property-label">
                <Icon name="lucide:cloud-lightning" class="property-icon text-sky-500 animate-pulse" />
                <span>Données Météo</span>
              </div>
              <div class="property-value text-xs text-slate-500 font-semibold flex items-center gap-1.5 pl-2">
                <span>Calcul historique réel via</span>
                <span class="open-meteo-badge">Open-Meteo API</span>
              </div>
            </div>
          </div>

          <!-- Media Attachment Deck -->
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
        </div>
      </section>

      <!-- RIGHT SECTION: LIVE MOBILE SANDBOX SIMULATOR (5 Cols on Desktop/Tablet - md breakpoint visible) -->
      <section class="md:col-span-5 h-full hidden md:flex flex-col gap-4 items-center justify-center bg-slate-50/40 rounded-3xl border border-slate-200/50 p-6 relative">
        <div class="preview-title-bar-top absolute top-6 left-6 right-6 flex items-center justify-center text-xs text-slate-400 font-extrabold uppercase tracking-widest">
          <span>Aperçu Mobile instantané</span>
        </div>

        <div class="mobile-phone-simulator scale-95 origin-center in-simulator">
          <div class="simulator-screen">
            <!-- Phone Notch / Status Bar -->
            <div class="simulator-status-bar">
              <span class="status-time">09:41</span>
              <div class="status-icons">
                <Icon name="lucide:wifi" class="w-3.5 h-3.5" />
                <Icon name="lucide:signal" class="w-3.5 h-3.5" />
                <Icon name="lucide:battery" class="w-4 h-4" />
              </div>
            </div>

            <!-- App Bar -->
            <div class="simulator-app-header">
              <span class="font-display font-black text-slate-800 tracking-tight text-lg animate-pulse" style="animation-duration: 3s;">MSO20s Journal</span>
              <div class="flex items-center gap-2">
                <Icon name="lucide:search" class="w-4 h-4 text-slate-500" />
                <Icon name="lucide:bell" class="w-4 h-4 text-slate-500" />
              </div>
            </div>

            <!-- Feed Content -->
            <div class="simulator-content-area">
              <JournalPostCard :post="mockPost" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Mobile-only floating Preview Toggle Button (Only active on small viewports < md) -->
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
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import JournalPostCard from '~/components/journal/JournalPostCard.vue';

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
const isDragOver = ref(false);
const fileInput = ref<HTMLInputElement>();
const textareaRef = ref<HTMLTextAreaElement>();

// GPS Coordinates and Live Weather for Mobile Simulator Preview
const selectedLatitude = ref<number | null>(null);
const selectedLongitude = ref<number | null>(null);
const simulatorWeatherInfo = ref<string | null>(null);

// Draft states
const isSavingDraft = ref(false);
const draftStatusText = ref('Brouillon à jour');
let autoSaveTimeout: any = null;

// Character count progress gauge calculations
const maxChars = 1000;
const charCount = computed(() => caption.value.length);
const wordCount = computed(() => {
  if (!caption.value.trim()) return 0;
  return caption.value.trim().split(/\s+/).length;
});

const strokeDasharray = computed(() => 2 * Math.PI * 8);

const strokeDashoffset = computed(() => {
  const ratio = Math.min(charCount.value / maxChars, 1);
  return strokeDasharray.value * (1 - ratio);
});

const gaugeColor = computed(() => {
  const ratio = charCount.value / maxChars;
  if (ratio > 0.9) return '#ef4444';
  if (ratio > 0.75) return '#f59e0b';
  return '#6366f1';
});

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

const wrapText = (before: string, after: string) => {
  const el = textareaRef.value;
  if (!el) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const text = caption.value;
  const selected = text.substring(start, end);
  caption.value = text.substring(0, start) + before + selected + after + text.substring(end);
  queueDraftSave();
  nextTick(() => {
    el.focus();
    el.setSelectionRange(start + before.length, start + before.length + selected.length);
  });
};

const insertText = (str: string) => {
  const el = textareaRef.value;
  if (!el) return;
  const start = el.selectionStart;
  const text = caption.value;
  caption.value = text.substring(0, start) + str + text.substring(start);
  queueDraftSave();
  nextTick(() => {
    el.focus();
    el.setSelectionRange(start + str.length, start + str.length);
  });
};

const toggleMobilePreview = () => {
  activeTab.value = activeTab.value === 'editor' ? 'preview' : 'editor';
};

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
    attachments.value.push({ file, previewUrl, fileType, caption: '', location: '' });
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
        adjustTextareaHeight();
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
    if (textareaRef.value) textareaRef.value.style.height = 'auto';
  }
};

// Open-Meteo Real-time Live Weather Retriever for Mobile Simulator
const onLocationSelect = (data: { latitude: number; longitude: number; display_name: string }) => {
  selectedLatitude.value = data.latitude;
  selectedLongitude.value = data.longitude;
  fetchLiveWeatherForSimulator();
  queueDraftSave();
};

const fetchLiveWeatherForSimulator = async () => {
  if (!selectedLatitude.value || !selectedLongitude.value || !eventDate.value) {
    simulatorWeatherInfo.value = null;
    return;
  }
  
  simulatorWeatherInfo.value = '☁️ Recherche météo...';
  
  try {
    const lat = selectedLatitude.value;
    const lon = selectedLongitude.value;
    const dateStr = eventDate.value;
    
    const todayStr = new Date().toISOString().split('T')[0];
    const deltaDays = Math.floor((new Date(todayStr).getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    
    let url = "";
    if (0 <= deltaDays && deltaDays <= 90) {
      url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&past_days=${deltaDays}&hourly=temperature_2m,weather_code`;
    } else {
      url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${dateStr}&end_date=${dateStr}&hourly=temperature_2m,weather_code`;
    }
    
    const res = await fetch(url);
    if (!res.ok) {
      simulatorWeatherInfo.value = null;
      return;
    }
    const data = await res.json();
    const hourly = data.hourly || {};
    const times = hourly.time || [];
    const temps = hourly.temperature_2m || [];
    const codes = hourly.weather_code || [];
    
    if (!times.length || !temps.length || !codes.length) {
      simulatorWeatherInfo.value = null;
      return;
    }
    
    let index = 0;
    if (eventTime.value) {
      const timePrefix = eventTime.value.substring(0, 2);
      const foundIdx = times.findIndex((t: string) => t.startsWith(`${dateStr}T${timePrefix}:`));
      if (foundIdx !== -1) index = foundIdx;
    }
    
    let temp = temps[index];
    let code = codes[index];
    
    if (index === 0 && !eventTime.value) {
      // Average temp
      temp = temps.reduce((a: number, b: number) => a + b, 0) / temps.length;
      // Dominant weather code
      const counts = codes.reduce((acc: any, val: number) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      const sortedCodes = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      code = parseInt(sortedCodes[0], 10);
    }
    
    const WMO_MAP: any = {
      0: ['☀️', 'Ciel dégagé'],
      1: ['🌤️', 'Principalement dégagé'],
      2: ['⛅', 'Partiellement nuageux'],
      3: ['☁️', 'Nuageux'],
      45: ['🌫️', 'Brouillard'],
      48: ['🌫️', 'Brouillard givrant'],
      51: ['🌧️', 'Bruine légère'],
      53: ['🌧️', 'Bruine modérée'],
      55: ['🌧️', 'Bruine dense'],
      56: ['🌧️', 'Bruine verglaçante'],
      57: ['🌧️', 'Bruine verglaçante'],
      61: ['🌧️', 'Pluie faible'],
      63: ['🌧️', 'Pluie modérée'],
      65: ['🌧️', 'Pluie forte'],
      66: ['🌧️', 'Pluie verglaçante'],
      67: ['🌧️', 'Pluie verglaçante'],
      71: ['❄️', 'Neige légère'],
      73: ['❄️', 'Neige modérée'],
      75: ['❄️', 'Neige forte'],
      77: ['❄️', 'Grains de neige'],
      80: ['🌦️', 'Averses de pluie'],
      81: ['🌦️', 'Averses de pluie'],
      82: ['🌦️', 'Averses de pluie'],
      85: ['❄️', 'Averses de neige'],
      86: ['❄️', 'Averses de neige'],
      95: ['⛈️', 'Orage'],
      96: ['⛈️', 'Orage avec grêle'],
      99: ['⛈️', 'Orage avec grêle']
    };
    
    const [emoji, desc] = WMO_MAP[code] || ['🌡️', 'Météo générale'];
    simulatorWeatherInfo.value = `${emoji} ${temp.toFixed(1)}°C - ${desc} (Direct)`;
  } catch (e) {
    console.error('Erreur lors du fetch météo de simulation :', e);
    simulatorWeatherInfo.value = null;
  }
};

watch([eventDate, eventTime], () => {
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

.zen-header {
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
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

.draft-autosave-indicator {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  color: #64748b !important;
  background: #f1f5f9 !important;
  padding: 0.45rem 1rem !important;
  border-radius: 9999px !important;
  transition: all 0.2s !important;
}

.draft-autosave-indicator.saving {
  color: #6366f1 !important;
  background: rgba(99, 102, 241, 0.08) !important;
}

.publish-top-btn {
  background: #0f172a !important;
  color: white !important;
  border: none !important;
  padding: 0.55rem 1.35rem !important;
  border-radius: 9999px !important;
  font-size: 0.9rem !important;
  font-weight: 800 !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.45rem !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08) !important;
}

.publish-top-btn:hover:not(:disabled) {
  background: #6366f1 !important;
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.25) !important;
  transform: translateY(-1px) !important;
}

.publish-top-btn:disabled {
  opacity: 0.4 !important;
  cursor: not-allowed !important;
  box-shadow: none !important;
}

@keyframes pulseLight {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

@media (max-width: 1023px) {
  .writing-zen-mode {
    height: auto !important;
    overflow: auto !important;
  }
  main {
    height: auto !important;
    overflow: visible !important;
  }
}

/* Local Styles of create.vue for complete, bulletproof layout security */
.editor-canvas-card {
  background: white !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  border-radius: 24px !important;
  padding: 2.25rem !important;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.01) !important;
}

.editor-writing-area {
  border-bottom: 1px solid #f1f5f9 !important;
  padding-bottom: 1.5rem !important;
}

.editor-title-container {
  margin-bottom: 1rem !important;
}

.editor-title-input {
  width: 100% !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
  font-family: var(--font-display) !important;
  font-size: 1.75rem !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  padding: 0 !important;
  letter-spacing: -0.02em !important;
}

.editor-title-input::placeholder {
  color: #94a3b8 !important;
}

/* Interactive Formatting Toolbar */
.markdown-toolbar {
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  padding: 0.35rem !important;
  border-radius: 12px !important;
  margin-bottom: 1rem !important;
}

.toolbar-tool-btn {
  width: 32px !important;
  height: 32px !important;
  border-radius: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #64748b !important;
  border: none !important;
  background: transparent !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
}

.toolbar-tool-btn:hover {
  background: #f1f5f9 !important;
  color: #0f172a !important;
}

.toolbar-divider {
  width: 1px !important;
  height: 18px !important;
  background: #cbd5e1 !important;
  margin: 0 0.5rem !important;
}

.textarea-relative-wrapper {
  position: relative !important;
}

.editor-textarea {
  width: 100% !important;
  min-height: 180px !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
  font-family: var(--font-body) !important;
  font-size: 1.1rem !important;
  line-height: 1.7 !important;
  color: #1e293b !important;
  padding: 0.25rem 0 2rem !important;
  resize: none !important;
}

.editor-textarea::placeholder {
  color: #94a3b8 !important;
}

.editor-stats-overlay {
  position: absolute !important;
  bottom: 0px !important;
  right: 0px !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
}

.stat-bubble {
  font-size: 0.775rem !important;
  font-weight: 700 !important;
  color: #64748b !important;
  background: #f1f5f9 !important;
  padding: 0.25rem 0.65rem !important;
  border-radius: 9999px !important;
}

.stat-gauge-container {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.progress-ring__circle {
  transition: stroke-dashoffset 0.35s !important;
  transform: rotate(-90deg) !important;
  transform-origin: 50% 50% !important;
}

/* Notion-style Properties Block */
.properties-editor-box {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.625rem !important;
  background: rgba(248, 250, 252, 0.6) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  border-radius: 20px !important;
  padding: 1.25rem 1.5rem !important;
}

.property-row {
  display: grid !important;
  grid-template-columns: 180px 1fr !important;
  align-items: center !important;
  gap: 1rem !important;
  min-height: 38px !important;
}

.property-label {
  display: flex !important;
  align-items: center !important;
  gap: 0.625rem !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  color: #64748b !important;
}

.property-icon {
  width: 1rem !important;
  height: 1rem !important;
}

.property-value {
  display: flex !important;
  align-items: center !important;
}

.property-input-field {
  width: 100% !important;
  border: none !important;
  background: transparent !important;
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
  padding: 0.35rem 0.5rem !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 8px !important;
  transition: background 0.2s !important;
}

.property-input-field:hover, .property-input-field:focus {
  background: rgba(15, 23, 42, 0.03) !important;
}

.property-input-autocomplete {
  width: 100% !important;
}

.property-input-autocomplete input {
  width: 100% !important;
  border: none !important;
  background: transparent !important;
  font-size: 0.9rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
  padding: 0.35rem 0.5rem !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 8px !important;
  transition: background 0.2s !important;
}

.property-input-autocomplete input:hover, .property-input-autocomplete input:focus {
  background: rgba(15, 23, 42, 0.03) !important;
}

.open-meteo-badge {
  background: rgba(99, 102, 241, 0.08) !important;
  color: #6366f1 !important;
  padding: 2px 8px !important;
  border-radius: 6px !important;
  font-weight: 800 !important;
}

.inline-automation-row {
  border-top: 1px solid rgba(226, 232, 240, 0.5) !important;
  margin-top: 0.25rem !important;
  padding-top: 0.75rem !important;
}

@media (max-width: 640px) {
  .property-row {
    grid-template-columns: 1fr !important;
    gap: 0.25rem !important;
    align-items: flex-start !important;
  }
}

/* Smartphone Simulator */
.mobile-phone-simulator {
  width: 320px !important;
  background: #0f172a !important;
  border: 10px solid #1e293b !important;
  border-radius: 36px !important;
  box-shadow: 
    0 25px 60px -15px rgba(15, 23, 42, 0.25) !important,
    0 0 0 1px rgba(255,255,255,0.03) !important;
  overflow: hidden !important;
  height: 600px !important;
  display: flex !important;
  flex-direction: column !important;
}

.simulator-screen {
  flex: 1 !important;
  background: #f8fafc !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}

.simulator-status-bar {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 0.4rem 1.25rem 0.2rem !important;
  background: white !important;
  font-size: 0.7rem !important;
  font-weight: 700 !important;
  color: #1e293b !important;
}

.status-icons {
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
}

.simulator-app-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0.75rem 1.25rem 0.5rem !important;
  background: white !important;
  border-bottom: 1px solid #f1f5f9 !important;
}

.simulator-content-area {
  flex: 1 !important;
  overflow-y: auto !important;
  padding: 0.75rem !important;
}
</style>
