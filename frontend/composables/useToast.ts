import { ref, readonly } from 'vue';

export interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

export function useToast() {
  const addToast = (message: string, type: Toast['type'] = 'info', timeout = 4000) => {
    const id = nextId++;
    const toast: Toast = { id, message, type, timeout };
    toasts.value.push(toast);

    if (timeout > 0) {
      setTimeout(() => {
        removeToast(id);
      }, timeout);
    }
    return id;
  };

  const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return {
    toasts: readonly(toasts),
    info: (message: string, timeout?: number) => addToast(message, 'info', timeout),
    success: (message: string, timeout?: number) => addToast(message, 'success', timeout),
    warning: (message: string, timeout?: number) => addToast(message, 'warning', timeout),
    error: (message: string, timeout?: number) => addToast(message, 'error', timeout),
    remove: removeToast
  };
}
