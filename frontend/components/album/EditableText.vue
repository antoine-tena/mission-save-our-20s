<template>
  <div class="editable-text-wrapper" @dblclick="startEditing">
    <div v-if="!isEditing" :class="[textClass, { 'editable-placeholder': !modelValue }]" class="display-text">
      {{ modelValue || placeholder }}
    </div>
    <div v-else class="edit-mode">
      <input 
        v-if="type === 'input'" 
        ref="inputRef"
        type="text" 
        :value="modelValue" 
        :class="inputClass"
        :placeholder="placeholder"
        @input="onInput"
        @blur="finishEditing"
        @keyup.enter="finishEditing"
      >
      <textarea 
        v-else 
        ref="inputRef"
        :value="modelValue" 
        :class="inputClass"
        :placeholder="placeholder"
        :rows="rows"
        @input="onInput"
        @blur="finishEditing"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: string;
  type?: 'input' | 'textarea';
  placeholder?: string;
  textClass?: string;
  inputClass?: string;
  rows?: number;
}>(), {
  type: 'input',
  placeholder: 'Cliquez deux fois pour modifier...',
  rows: 4
});

const emit = defineEmits(['update:modelValue', 'save']);

const isEditing = ref(false);
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);

const startEditing = async () => {
  isEditing.value = true;
  await nextTick();
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement | HTMLTextAreaElement).value);
};

const finishEditing = () => {
  if (isEditing.value) {
    isEditing.value = false;
    emit('save', props.modelValue);
  }
};
</script>

<style scoped>
.editable-text-wrapper {
  width: 100%;
  cursor: text;
  transition: all 0.2s;
  border-radius: 6px;
}
.editable-text-wrapper:hover {
  background: rgba(0,0,0,0.02);
}
.display-text {
  width: 100%;
  word-break: break-word;
}
.editable-placeholder {
  color: #cbd5e0;
  font-style: italic;
}
.edit-mode input, .edit-mode textarea {
  width: 100%;
  border: 1px solid rgba(99, 102, 241, 0.4);
  border-radius: 6px;
  background: white;
  padding: 4px;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
</style>