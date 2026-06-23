<template>
  <div class="toast-overlay-container">
    <TransitionGroup name="toast-list">
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        class="toast-card glass-card"
        :class="`toast-${toast.type}`"
        @click="remove(toast.id)"
      >
        <div class="toast-icon">
          <Icon :name="getIconName(toast.type)" />
        </div>
        <div class="toast-message-content font-sans">
          {{ toast.message }}
        </div>
        <button class="toast-close-btn" @click.stop="remove(toast.id)">
          <Icon name="lucide:x" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';

const { toasts, remove } = useToast();

const getIconName = (type: 'info' | 'success' | 'warning' | 'error') => {
  const icons = {
    info: 'lucide:info',
    success: 'lucide:party-popper', // Fun Scrapbook style
    warning: 'lucide:alert-triangle',
    error: 'lucide:alert-circle'
  };
  return icons[type] || 'lucide:bell';
};
</script>

<style scoped>
.toast-overlay-container {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 360px;
  width: calc(100% - 3rem);
  pointer-events: none;
}

.toast-card {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 1rem 2.5rem 1rem 1.2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #edf2f7;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
}

/* Toast types */
.toast-success::before { background-color: #ca75d6; } /* Matching MSO20s theme brand */
.toast-success .toast-icon { color: #ca75d6; }

.toast-info::before { background-color: #3b82f6; }
.toast-info .toast-icon { color: #3b82f6; }

.toast-warning::before { background-color: #f59e0b; }
.toast-warning .toast-icon { color: #f59e0b; }

.toast-error::before { background-color: #ef4444; }
.toast-error .toast-icon { color: #ef4444; }

.toast-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-message-content {
  font-size: 0.85rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1.4;
  word-break: break-word;
}

.toast-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;
}

.toast-close-btn:hover {
  background: #f7fafc;
  color: #4a5568;
}

/* Toast List Transitions */
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.toast-list-leave-active {
  position: absolute;
}
</style>
