<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" @click="$emit('close')">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]" @click.stop>
        <!-- Modal Header -->
        <header class="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 class="font-display font-extrabold text-slate-800 tracking-tight text-lg flex items-center gap-2">
            <Icon name="lucide:edit-3" class="w-5 h-5 text-indigo-500" />
            <span>Modifier la publication</span>
          </h3>
          <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <Icon name="lucide:x" class="w-6 h-6" />
          </button>
        </header>

        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto flex flex-col gap-5">
          <!-- Title -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Titre de l'aventure</label>
            <input 
              v-model="editTitle" 
              type="text" 
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white font-semibold text-slate-800 transition-all" 
              placeholder="Modifier le titre..." 
            />
          </div>

          <!-- Caption -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Votre histoire (Markdown supporté)</label>
            <textarea 
              v-model="editCaption" 
              rows="5"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white font-medium text-slate-700 transition-all resize-none" 
              placeholder="Racontez votre souvenir..."
            ></textarea>
          </div>

          <!-- Properties Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Location -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Lieu</label>
              <input 
                v-model="editLocation" 
                type="text" 
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white font-semibold text-slate-800 transition-all" 
                placeholder="Lieu..." 
              />
            </div>

            <!-- Date -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Date du souvenir</label>
              <input 
                v-model="editEventDate" 
                type="date" 
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white font-semibold text-slate-800 transition-all" 
              />
            </div>
          </div>

          <!-- Event Time -->
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-slate-400 uppercase tracking-wider">Heure précise (opt.)</label>
            <input 
              v-model="editEventTime" 
              type="time" 
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white font-semibold text-slate-800 transition-all" 
            />
          </div>
        </div>

        <!-- Modal Footer -->
        <footer class="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button @click="$emit('close')" class="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer text-sm">
            Annuler
          </button>
          <button @click="handleSave" class="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all cursor-pointer text-sm">
            Enregistrer
          </button>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  show: boolean;
  post: any;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', payload: any): void;
}>();

const editTitle = ref('');
const editCaption = ref('');
const editLocation = ref('');
const editEventDate = ref('');
const editEventTime = ref('');

const initializeFields = () => {
  if (props.post) {
    editTitle.value = props.post.title || '';
    editCaption.value = props.post.caption || '';
    editLocation.value = props.post.location || '';
    editEventDate.value = props.post.event_date || '';
    editEventTime.value = props.post.event_time ? props.post.event_time.substring(0, 5) : '';
  }
};

onMounted(initializeFields);

watch(() => props.post, initializeFields);

const handleSave = () => {
  emit('save', {
    title: editTitle.value,
    caption: editCaption.value,
    location: editLocation.value,
    event_date: editEventDate.value || null,
    event_time: editEventTime.value || null
  });
};
</script>
