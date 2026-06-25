<template>
  <div class="editor-canvas-card">
    <!-- Text Editing Area -->
    <div class="editor-writing-area">
      <!-- Title Input -->
      <div class="editor-title-container">
        <input 
          :value="title"
          type="text"
          class="editor-title-input" 
          placeholder="Le titre de votre aventure..." 
          maxlength="80" 
          @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
        >
      </div>

      <!-- Interactive Formatting Markdown Helper Toolbar -->
      <div class="markdown-toolbar">
        <button type="button" class="toolbar-tool-btn" title="Gras (Ctrl+B)" @click="wrapText('**', '**')">
          <Icon name="lucide:bold" class="w-4.5 h-4.5" />
        </button>
        <button type="button" class="toolbar-tool-btn" title="Italique (Ctrl+I)" @click="wrapText('*', '*')">
          <Icon name="lucide:italic" class="w-4.5 h-4.5" />
        </button>
        <button type="button" class="toolbar-tool-btn" title="Citation" @click="wrapText('> ', '')">
          <Icon name="lucide:quote" class="w-4.5 h-4.5" />
        </button>
        <button type="button" class="toolbar-tool-btn" title="Code" @click="wrapText('`', '`')">
          <Icon name="lucide:code" class="w-4.5 h-4.5" />
        </button>
        <button type="button" class="toolbar-tool-btn" title="Liste à puces" @click="insertText('- ')">
          <Icon name="lucide:list" class="w-4.5 h-4.5" />
        </button>
        
        <div class="toolbar-divider"/>

        <!-- Clear Draft Action inside toolbar -->
        <button 
          v-if="title || caption || attachments.length > 0" 
          type="button" 
          class="toolbar-tool-btn text-slate-400 hover:text-red-500 ml-auto"
          title="Effacer le brouillon"
          @click="$emit('clear-draft')"
        >
          <Icon name="lucide:trash-2" class="w-4.5 h-4.5" />
        </button>
      </div>

      <!-- Main Rich Textarea -->
      <div class="textarea-relative-wrapper">
        <textarea 
          ref="textareaRef"
          :value="caption"
          class="editor-textarea"
          placeholder="Racontez votre moment ici... Laissez parler votre créativité !" 
          rows="8" 
          @input="onTextareaInput(($event.target as HTMLTextAreaElement).value)"
        />
        
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

    <!-- Properties Editor Grid -->
    <JournalEditorProperties
      :location="location"
      :event-date="eventDate"
      :event-time="eventTime"
      @update:location="$emit('update:location', $event)"
      @update:event-date="$emit('update:eventDate', $event)"
      @update:event-time="$emit('update:eventTime', $event)"
      @select-location="$emit('select-location', $event)"
    />

    <!-- Attachments section -->
    <JournalEditorAttachments
      :attachments="attachments"
      @add-files="$emit('add-files', $event)"
      @remove-attachment="$emit('remove-attachment', $event)"
      @update-attachment="$emit('update-attachment', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue';
import JournalEditorProperties from './JournalEditorProperties.vue';
import JournalEditorAttachments from './JournalEditorAttachments.vue';

const props = defineProps<{
  title: string;
  caption: string;
  location: string;
  eventDate: string;
  eventTime: string;
  attachments: any[];
}>();

const emit = defineEmits<{
  (e: 'update:title', val: string): void;
  (e: 'update:caption', val: string): void;
  (e: 'update:location', val: string): void;
  (e: 'update:eventDate', val: string): void;
  (e: 'update:eventTime', val: string): void;
  (e: 'select-location', val: any): void;
  (e: 'clear-draft'): void;
  (e: 'add-files', files: FileList): void;
  (e: 'remove-attachment', index: number): void;
  (e: 'update-attachment', data: any): void;
}>();

const textareaRef = ref<HTMLTextAreaElement>();

// Stats counter logic
const maxChars = 1000;
const charCount = computed(() => props.caption.length);
const wordCount = computed(() => {
  if (!props.caption.trim()) return 0;
  return props.caption.trim().split(/\s+/).length;
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

const onTextareaInput = (value: string) => {
  emit('update:caption', value);
  adjustTextareaHeight();
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
  const text = props.caption;
  const selected = text.substring(start, end);
  const newCaption = text.substring(0, start) + before + selected + after + text.substring(end);
  emit('update:caption', newCaption);
  nextTick(() => {
    el.focus();
    el.setSelectionRange(start + before.length, start + before.length + selected.length);
  });
};

const insertText = (str: string) => {
  const el = textareaRef.value;
  if (!el) return;
  const start = el.selectionStart;
  const text = props.caption;
  const newCaption = text.substring(0, start) + str + text.substring(start);
  emit('update:caption', newCaption);
  nextTick(() => {
    el.focus();
    el.setSelectionRange(start + str.length, start + str.length);
  });
};

onMounted(() => {
  adjustTextareaHeight();
});
</script>

<style scoped>
.editor-canvas-card {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  border-radius: 24px !important;
  padding: 2rem !important;
  box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.04) !important;
}
.editor-writing-area {
  display: flex !important;
  flex-direction: column !important;
  gap: 1rem !important;
}
.editor-title-container {
  border-bottom: 2px solid #f1f5f9 !important;
  padding-bottom: 0.5rem !important;
}
.editor-title-input {
  width: 100% !important;
  font-family: 'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif !important;
  font-size: 1.85rem !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  border: none !important;
  background: transparent !important;
  outline: none !important;
  letter-spacing: -0.02em !important;
}
.editor-title-input::placeholder {
  color: #cbd5e1 !important;
}
.markdown-toolbar {
  display: flex !important;
  align-items: center !important;
  gap: 0.35rem !important;
  padding: 0.5rem !important;
  background: #f8fafc !important;
  border-radius: 12px !important;
  border: 1px solid #f1f5f9 !important;
}
.toolbar-tool-btn {
  width: 2rem !important;
  height: 2rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 8px !important;
  color: #475569 !important;
  transition: all 0.2s ease !important;
  cursor: pointer !important;
  border: none !important;
  background: transparent !important;
}
.toolbar-tool-btn:hover {
  background: #f1f5f9 !important;
  color: #4f46e5 !important;
}
.toolbar-divider {
  width: 1px !important;
  height: 1.25rem !important;
  background: #e2e8f0 !important;
  margin: 0 0.25rem !important;
}
.textarea-relative-wrapper {
  position: relative !important;
}
.editor-textarea {
  width: 100% !important;
  border: none !important;
  background: transparent !important;
  font-size: 1.05rem !important;
  line-height: 1.6 !important;
  color: #334155 !important;
  outline: none !important;
  resize: none !important;
  padding-bottom: 3rem !important;
  font-weight: 500 !important;
}
.editor-textarea::placeholder {
  color: #94a3b8 !important;
}
.editor-stats-overlay {
  position: absolute !important;
  bottom: 0 !important;
  right: 0 !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  background: linear-gradient(to top, rgba(255,255,255,0.95) 60%, rgba(255,255,255,0)) !important;
  padding: 0.5rem 0.5rem 0.25rem 2rem !important;
  border-radius: 12px !important;
}
.stat-bubble {
  font-size: 0.75rem !important;
  font-weight: 700 !important;
  color: #64748b !important;
  background: #f1f5f9 !important;
  padding: 0.25rem 0.6rem !important;
  border-radius: 99px !important;
}
.progress-ring__circle {
  transform: rotate(-90deg) !important;
  transform-origin: 50% 50% !important;
  transition: stroke-dashoffset 0.35s !important;
}
</style>
