<template>
  <div class="mso-journal">
    <div class="journal-bg"></div>
    
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-300/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 8s;"></div>
      <div class="absolute bottom-[0%] left-[-10%] w-[30rem] h-[30rem] bg-fuchsia-300/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 10s;"></div>
    </div>
    
    <PageHero
      title="Le Journal Collaboratif"
      icon="lucide:book-open"
      icon-class="text-indigo-500"
      subtitle="Partagez sans limites, sans pressions, sans likes ni commentaires."
      subtitle-class="text-indigo-600"
    >
      <template #actions>
        <NuxtLink 
          to="/journal/create" 
          class="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:shadow-indigo-500/30 flex items-center gap-2"
        >
          <Icon name="lucide:plus" class="w-5 h-5" />
          <span>Nouvelle page</span>
        </NuxtLink>
      </template>
    </PageHero>

    <div class="container journal-body">
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
import { onMounted } from 'vue';
import { useRichPosts } from '~/composables/useRichPosts';
import JournalPostCard from '~/components/journal/JournalPostCard.vue';

const { richPosts, isLoading, fetchRichPosts } = useRichPosts();

onMounted(fetchRichPosts);
useSeoMeta({ title: 'Le Journal — MSO20s' });
</script>

<style>
/* Les styles sont gérés globalement dans nuxt.config.ts */
</style>
