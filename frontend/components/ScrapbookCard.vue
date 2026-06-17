<template>
  <div :class="['scrapbook-card', { 'glass-card': glass }]" :style="cardStyle">
    <div
      v-if="tape !== 'none'"
      :class="['tape-effect', `tape-effect--${tape}`]"
      :style="{ backgroundColor: tapeColor }"
    ></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  tape?: 'center' | 'corner' | 'corner-left' | 'none';
  tapeColor?: string;
  glass?: boolean;
  rotation?: string;
}>(), {
  tape: 'center',
  tapeColor: 'rgba(202, 117, 214, 0.2)',
  glass: true,
  rotation: '0deg'
});

const cardStyle = computed(() => {
  return {
    transform: props.rotation !== '0deg' ? `rotate(${props.rotation})` : undefined
  };
});
</script>

<style scoped>
.scrapbook-card {
  padding: 3rem;
  position: relative;
  box-sizing: border-box;
}

.tape-effect {
  position: absolute;
  width: 120px;
  height: 35px;
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
  z-index: 10;
}

.tape-effect--center {
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
}

.tape-effect--corner {
  top: -10px;
  right: -20px;
  transform: rotate(45deg);
}

.tape-effect--corner-left {
  top: -10px;
  left: -20px;
  transform: rotate(-45deg);
}
</style>
