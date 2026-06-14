<template>
  <div class="mso-journal">
    <div class="journal-bg"></div>
    
    <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10 container mx-auto px-4">
      <div>
        <h1 class="font-display text-5xl md:text-6xl font-bold text-slate-800 tracking-tight flex items-center gap-4">
          Le Journal Collaboratif <Icon name="lucide:book-open" class="text-indigo-500 w-12 h-12" />
        </h1>
        <p class="text-indigo-600 font-semibold mt-2 text-lg uppercase tracking-widest">Partagez sans limites, sans pressions, sans likes ni commentaires.</p>
      </div>
      <button 
        type="button" 
        class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-indigo-500/30 flex items-center gap-2 self-start md:self-end"
        :class="{ '!bg-indigo-600 !shadow-indigo-500/30': showForm }" 
        @click="showForm = !showForm"
      >
        <Icon :name="showForm ? 'lucide:x' : 'lucide:plus'" class="w-5 h-5" />
        <span>{{ showForm ? 'Fermer le carnet' : 'Nouvelle page' }}</span>
      </button>
    </header>

    <div class="container journal-body">
      <!-- Rich Post Form -->
      <Transition name="slide-down">
        <JournalCreateForm 
          v-if="showForm" 
          ref="createFormRef" 
          @submit="onFormSubmit" 
        />
      </Transition>

      <!-- Rich Posts Feed -->
      <div v-if="isLoading" class="loader-container">
        <Icon name="lucide:loader-2" class="spin main-loader" />
        <p>Ouverture du carnet de bord...</p>
      </div>

      <div v-else-if="richPosts.length === 0" class="empty-state">
        <Icon name="lucide:book-open" class="empty-icon" />
        <h2>Le journal est encore vierge.</h2>
        <p>Commencez par écrire la toute première page de votre aventure !</p>
      </div>

      <div v-else class="feed-grid">
        <JournalPostCard 
          v-for="post in richPosts" 
          :key="post.id" 
          :post="post" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRichPosts } from '~/composables/useRichPosts';
import JournalPostCard from '~/components/journal/JournalPostCard.vue';
import JournalCreateForm from '~/components/journal/JournalCreateForm.vue';

const { richPosts, isLoading, fetchRichPosts, createRichPost } = useRichPosts();

const showForm = ref(false);
const createFormRef = ref<any>(null);

const onFormSubmit = async (fd: FormData) => {
  if (await createRichPost(fd)) {
    createFormRef.value?.resetForm();
    showForm.value = false;
  } else {
    createFormRef.value.isSubmitting = false; // Reset loading state in form if error
  }
};

onMounted(fetchRichPosts);
useSeoMeta({ title: 'Le Journal — MSO20s' });
</script>

<style scoped>
@import '~/assets/css/journal.css';
</style>
