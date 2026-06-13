<template>
  <div 
    v-if="page.description !== null"
    class="rich-text-editorial-block flex flex-col border border-gray-200 rounded-xl bg-amber-50/20 shadow-sm relative group flex-shrink-0"
    :class="{ 'border-indigo-400 ring-2 ring-indigo-50 bg-white': isEditing }"
  >
    <!-- Microsoft Word-like formatting toolbar -->
    <AlbumRichTextToolbar :readonly="readonly" @format="format" @delete="deleteText" />

    <!-- Editable block -->
    <div 
      ref="editorRef"
      :contenteditable="!readonly"
      class="rich-text-editor-content p-3 outline-none font-serif text-sm text-gray-800 leading-relaxed overflow-y-auto max-h-[85px] w-full"
      @focus="isEditing = true"
      @blur="onBlur"
      placeholder="Écrivez vos pensées et mémoires ici..."
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { useAlbumHistory } from '~/composables/useAlbumHistory';

const props = defineProps<{
  page: any;
  readonly: boolean;
}>();

const { updatePageField, fetchAlbumDetail } = useAlbumEditorStore();

const isEditing = ref(false);
const editorRef = ref<HTMLElement | null>(null);

// Sync incoming text updates to editor's innerHTML
watch(() => props.page.description, (newVal) => {
  if (editorRef.value && editorRef.value.innerHTML !== newVal) {
    editorRef.value.innerHTML = newVal || '';
  }
}, { immediate: true });

onMounted(() => {
  if (editorRef.value && props.page.description) {
    editorRef.value.innerHTML = props.page.description;
  }
});

const onBlur = async () => {
  isEditing.value = false;
  await saveText();
};

const saveText = async () => {
  if (!editorRef.value) return;
  const currentHTML = editorRef.value.innerHTML;
  if (currentHTML !== props.page.description) {
    try {
      await updatePageField(props.page.id, 'description', currentHTML);
      await fetchAlbumDetail(props.page.album, true);
    } catch (err) {
      console.error('Failed to auto-save page description:', err);
    }
  }
};

const format = (command: string, value: string | undefined = undefined) => {
  if (props.readonly) return;
  document.execCommand(command, false, value);
  saveText();
};

const deleteText = async () => {
  if (confirm('Voulez-vous supprimer la zone de texte de cette page ?')) {
    try {
      const { recordHistory } = useAlbumHistory();
      recordHistory();
      await updatePageField(props.page.id, 'description', null);
      await fetchAlbumDetail(props.page.album, true);
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<style scoped>
.rich-text-editorial-block {
  background-color: #faf8f2;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  margin-bottom: 8px;
  position: relative;
  z-index: 10;
  border: 1px solid transparent;
}
.page-content-wrapper:not(.readonly) .rich-text-editorial-block {
  border: 3px solid #a3b18a !important;
}
.rich-text-editor-content {
  font-family: 'Georgia', 'Playfair Display', serif;
  text-align: left;
  line-height: 1.6;
}
.page-content-wrapper:not(.readonly) .rich-text-editor-content {
  border: 2px dashed #8b5cf6 !important;
  border-radius: 4px;
  margin: 4px;
  width: calc(100% - 8px) !important;
}
.rich-text-editor-content::-webkit-scrollbar {
  width: 4px;
}
.rich-text-editor-content::-webkit-scrollbar-track {
  background: transparent;
}
.rich-text-editor-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.rich-text-editor-content:empty::before {
  content: attr(placeholder);
  color: #a0aec0;
  cursor: text;
}
</style>