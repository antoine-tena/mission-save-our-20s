<template>
  <Transition name="modal-fade">
    <div 
      v-if="show" 
      class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div 
        class="bg-white rounded-3xl shadow-2xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] transition-all duration-300"
        :class="maxWidth"
        @click.stop
      >
        <!-- Header -->
        <header v-if="title || $slots.header" class="p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <slot name="header">
            <h3 class="font-display font-extrabold text-slate-800 tracking-tight text-lg flex items-center gap-2">
              <Icon v-if="icon" :name="icon" class="w-5 h-5 text-indigo-500" />
              <span>{{ title }}</span>
            </h3>
          </slot>
          <button class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1 rounded-full hover:bg-slate-50 flex items-center justify-center" @click="handleClose">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </header>

        <!-- Body -->
        <div class="p-6 overflow-y-auto flex-1">
          <slot />
        </div>

        <!-- Footer -->
        <footer v-if="$slots.footer" class="p-6 border-t border-slate-100 flex items-center gap-3 justify-end flex-shrink-0 bg-slate-50">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
  show: boolean;
  title?: string;
  icon?: string;
  maxWidth?: string;
}>(), {
  title: '',
  icon: '',
  maxWidth: 'max-w-md'
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    handleClose();
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .transition-all {
  animation: modal-pop-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-fade-leave-active .transition-all {
  animation: modal-pop-out 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modal-pop-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes modal-pop-out {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
}
</style>
