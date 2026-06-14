<template>
  <div class="mso-journal">
    <div class="journal-bg"></div>
    
    <header class="journal-header container">
      <div class="header-text">
        <h1 class="fancy-title">Le Journal Collaboratif</h1>
        <p class="subtitle">
          <Icon name="lucide:book-open" class="pulse-icon" /> 
          Partagez sans limites, sans pressions, sans likes ni commentaires.
        </p>
      </div>
      <button 
        type="button" 
        class="btn-toggle-form" 
        :class="{ 'active': showForm }" 
        @click="showForm = !showForm"
      >
        <Icon :name="showForm ? 'lucide:x' : 'lucide:plus'" />
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
