<template>
  <div :class="['star-rating', { 'is-interactive': interactive }]">
    <span
      v-for="i in max"
      :key="i"
      :class="['star-item', { 'is-filled': modelValue >= i }]"
      @click="onClick(i)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        :fill="modelValue >= i ? color : 'none'"
        :stroke="modelValue >= i ? color : '#cbd5e0'"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number;
  max?: number;
  size?: number;
  color?: string;
  interactive?: boolean;
}>(), {
  max: 5,
  size: 20,
  color: '#fbbf24',
  interactive: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const onClick = (value: number) => {
  if (props.interactive) {
    emit('update:modelValue', value);
  }
};
</script>

<style scoped>
.star-rating {
  display: flex;
  gap: 4px;
  align-items: center;
}

.star-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.is-interactive .star-item {
  cursor: pointer;
  transition: transform 0.15s;
}

.is-interactive .star-item:hover {
  transform: scale(1.15);
}
</style>
