<template>
  <div class="location-autocomplete" ref="wrapperRef">
    <div class="autocomplete-input-wrapper">
      <Icon name="lucide:map-pin" class="input-icon" />
      <input 
        type="text" 
        :value="modelValue" 
        @input="onInput"
        :placeholder="placeholder" 
        :class="inputClass"
        autocomplete="off"
      />
    </div>
    
    <Transition name="dropdown-fade">
      <div v-if="suggestions.length > 0" class="suggestions-list-box shadow-xl">
        <div 
          v-for="(loc, idx) in suggestions" 
          :key="idx" 
          class="suggestion-item" 
          @click="selectSuggestion(loc)"
        >
          <Icon name="lucide:compass" class="suggestion-pin" />
          <span class="suggestion-text">{{ loc.display_name }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: string;
  placeholder?: string;
  inputClass?: string;
}>(), {
  placeholder: 'Rechercher un lieu ou une ville...',
  inputClass: 'autocomplete-default-input'
});

const emit = defineEmits(['update:modelValue', 'select']);

const suggestions = ref<any[]>([]);
const wrapperRef = ref<HTMLElement | null>(null);
let searchTimeout: any = null;

const onInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  emit('update:modelValue', val);
  
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    if (val.trim().length < 3) {
      suggestions.value = [];
      return;
    }
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&limit=5`);
      suggestions.value = await res.json();
    } catch (e) {
      console.error('Location autocomplete fetch error:', e);
    }
  }, 400);
};

const selectSuggestion = (loc: any) => {
  emit('update:modelValue', loc.display_name);
  emit('select', {
    display_name: loc.display_name,
    latitude: parseFloat(loc.lat),
    longitude: parseFloat(loc.lon)
  });
  suggestions.value = [];
};

const handleClickOutside = (e: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    suggestions.value = [];
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
@import '~/assets/css/location-autocomplete.css';
</style>