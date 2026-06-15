<template>
  <div class="editor-writing-area">
    <!-- Title Input -->
    <div class="editor-title-container">
      <input 
        v-model="title" 
        type="text" 
        class="editor-title-input" 
        placeholder="Le titre de votre aventure..." 
        maxlength="80"
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
      <button type="button" class="toolbar-tool-btn" @click="wrapText('> ', '')" title="Citation (Ctrl+Shift+U)">
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
        v-if="title || caption || hasAttachments"
        @click="$emit('clear')"
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
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';

const title = defineModel<string>('title');
const caption = defineModel<string>('caption');
const location = defineModel<string>('location');
const eventDate = defineModel<string>('eventDate');
const eventTime = defineModel<string>('eventTime');

defineProps<{ hasAttachments: boolean }>();
defineEmits(['clear']);

const textareaRef = ref<HTMLTextAreaElement>();

const maxChars = 1000;
const charCount = computed(() => caption.value?.length || 0);
const wordCount = computed(() => {
  if (!caption.value?.trim()) return 0;
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

const onTextareaInput = () => { elHeight(); };

const elHeight = () => {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = `${Math.min(el.scrollHeight, 400)}px`;
};

const wrapText = (before: string, after: string) => {
  const el = textareaRef.value;
  if (!el || !caption.value) return;
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const text = caption.value;
  const selected = text.substring(start, end);
  caption.value = text.substring(0, start) + before + selected + after + text.substring(end);
  nextTick(() => {
    el.focus();
    el.setSelectionRange(start + before.length, start + before.length + selected.length);
  });
};

const insertText = (str: string) => {
  const el = textareaRef.value;
  if (!el || !caption.value) return;
  const start = el.selectionStart;
  const text = caption.value;
  caption.value = text.substring(0, start) + str + text.substring(start);
  nextTick(() => {
    el.focus();
    el.setSelectionRange(start + str.length, start + str.length);
  });
};

defineExpose({ adjustTextareaHeight: elHeight });
</script>
