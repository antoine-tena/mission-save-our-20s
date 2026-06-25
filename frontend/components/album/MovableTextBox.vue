<template>
  <div 
    :data-box-id="box.id"
    class="movable-text-box shadow-md flex flex-col bg-[#fdfbf7] rounded-lg border border-amber-200/50 animate-fade-in"
    :class="{ 'editing-active': isEditing, 'readonly': readonly, 'focused': isFocused }"
    :style="getGridStyles()"
    @mousedown="onMousedown($event)"
  >
    <!-- Floating Minimal Formatting toolbar when focused -->
    <div v-if="isEditing && !readonly" class="floating-formatting-bar absolute -top-11 left-1/2 -translate-x-1/2 bg-white border border-gray-100 shadow-md rounded-lg px-2 py-1 flex items-center gap-1 z-50">
      <button type="button" class="bar-btn" title="Gras" @mousedown.prevent="format('bold')"><b>G</b></button>
      <button type="button" class="bar-btn font-serif italic" title="Italique" @mousedown.prevent="format('italic')">I</button>
      <button type="button" class="bar-btn underline" title="Souligné" @mousedown.prevent="format('underline')">S</button>
      <div class="h-3 w-[1px] bg-gray-200"/>
      <button type="button" class="bar-btn text-red-500" title="Supprimer" @click.stop="deleteBox"><Icon name="lucide:trash-2" class="text-xs" /></button>
    </div>

    <!-- Ruled Papery Note Editable Content Area -->
    <div 
      ref="editorRef"
      :contenteditable="!readonly"
      class="note-editor flex-1 p-1 outline-none font-serif text-[11px] text-gray-800 leading-normal overflow-y-auto w-full select-text cursor-text"
      placeholder="Saisissez vos notes ou poèmes..."
      @focus="isEditing = isFocused = true"
      @blur="onBlur"
    />

    <!-- Small deletion button on top-right -->
    <button v-if="!readonly && !isEditing" type="button" class="delete-btn" title="Supprimer la note" @click.stop="deleteBox">
      <Icon name="lucide:x" />
    </button>

    <!-- Bottom-right corner snap-to-grid resize handle -->
    <div v-if="!readonly && !isEditing" class="resize-handle" @mousedown.stop.prevent="onResizeMousedown($event)">
      <Icon name="lucide:arrow-down-right" class="text-[9px] text-gray-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useAlbumEditorStore } from '~/composables/useAlbumEditorStore';
import { parseTextBoxes, serializeTextBoxes } from '~/utils/textBoxes';
import { useMovableTextDragResize } from '~/composables/useMovableTextDragResize';
import type { TextBox } from '~/utils/textBoxes';

const props = defineProps<{ box: TextBox; page: any; readonly: boolean; }>();

const { updatePageField, fetchAlbumDetail } = useAlbumEditorStore();

const isEditing = ref(false);
const isFocused = ref(false);
const editorRef = ref<HTMLElement | null>(null);

const { onMousedown, onResizeMousedown } = useMovableTextDragResize(props, isFocused);

watch(() => props.box.text, (newVal) => {
  if (editorRef.value && editorRef.value.innerHTML !== newVal) {
    editorRef.value.innerHTML = newVal || '';
  }
}, { immediate: true });

onMounted(() => {
  if (editorRef.value && props.box.text) {
    editorRef.value.innerHTML = props.box.text;
  }
});

const onBlur = async () => {
  isEditing.value = isFocused.value = false;
  await saveText();
};

const saveText = async () => {
  if (!editorRef.value) return;
  const currentHTML = editorRef.value.innerHTML;
  if (currentHTML !== props.box.text) {
    const boxes = parseTextBoxes(props.page.description);
    const index = boxes.findIndex(b => b.id === props.box.id);
    if (index !== -1) {
      boxes[index].text = currentHTML;
      await updatePageField(props.page.id, 'description', serializeTextBoxes(boxes));
      await fetchAlbumDetail(props.page.album, true);
    }
  }
};

const format = (command: string) => {
  if (props.readonly) return;
  document.execCommand(command, false);
  saveText();
};

const deleteBox = async () => {
  if (confirm('Voulez-vous supprimer cette zone de texte ?')) {
    const boxes = parseTextBoxes(props.page.description);
    const updated = boxes.filter(b => b.id !== props.box.id);
    await updatePageField(props.page.id, 'description', serializeTextBoxes(updated));
    await fetchAlbumDetail(props.page.album, true);
  }
};

const getGridStyles = () => {
  return {
    gridColumnStart: `${props.box.x}`, gridColumnEnd: `${props.box.x + props.box.w}`,
    gridRowStart: `${props.box.y}`, gridRowEnd: `${props.box.y + props.box.h}`,
    zIndex: isFocused.value ? 30 : 25, transform: isEditing.value ? 'none' : 'rotate(-0.5deg)'
  };
};
</script>

<style scoped>
@import '~/assets/css/movable-text-box.css';
</style>