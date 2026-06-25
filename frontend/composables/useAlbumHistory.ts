import { ref, computed } from 'vue';
import { useRuntimeConfig, useCookie } from '#app';
import { activeAlbum } from './useAlbumEditorState';
import { syncChanges } from '~/utils/historySync';

const undoStack = ref<string[]>([]);
const redoStack = ref<string[]>([]);

export function useAlbumHistory() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:8000/api';
  const token = useCookie<string | null>('auth_token');

  const canUndo = computed(() => undoStack.value.length > 0);
  const canRedo = computed(() => redoStack.value.length > 0);

  const clearHistory = () => {
    undoStack.value = [];
    redoStack.value = [];
  };

  const recordHistory = () => {
    if (!activeAlbum.value) return;
    undoStack.value.push(JSON.stringify(activeAlbum.value));
    redoStack.value = [];
  };

  const undo = async () => {
    if (undoStack.value.length === 0 || !activeAlbum.value) return;
    
    const currentStateStr = JSON.stringify(activeAlbum.value);
    const previousStateStr = undoStack.value.pop()!;
    redoStack.value.push(currentStateStr);

    const previousState = JSON.parse(previousStateStr);
    const currentState = JSON.parse(currentStateStr);

    activeAlbum.value = previousState;
    const headers = { Authorization: `Token ${token.value}`, 'Content-Type': 'application/json' };
    await syncChanges(currentState, previousState, headers, apiBase);
  };

  const redo = async () => {
    if (redoStack.value.length === 0 || !activeAlbum.value) return;

    const currentStateStr = JSON.stringify(activeAlbum.value);
    const nextStateStr = redoStack.value.pop()!;
    undoStack.value.push(currentStateStr);

    const nextState = JSON.parse(nextStateStr);
    const currentState = JSON.parse(currentStateStr);

    activeAlbum.value = nextState;
    const headers = { Authorization: `Token ${token.value}`, 'Content-Type': 'application/json' };
    await syncChanges(currentState, nextState, headers, apiBase);
  };

  return {
    canUndo,
    canRedo,
    clearHistory,
    recordHistory,
    undo,
    redo
  };
}
