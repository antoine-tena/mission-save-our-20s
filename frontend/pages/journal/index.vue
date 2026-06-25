<template>
  <div class="mso-journal">
    <div class="journal-bg"/>
    
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-300/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 8s;"/>
      <div class="absolute bottom-[0%] left-[-10%] w-[30rem] h-[30rem] bg-fuchsia-300/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 10s;"/>
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

    <!-- Filters & Search Bar Section -->
    <div class="container mx-auto px-6 mb-8 relative z-10 max-w-7xl flex flex-col md:flex-row items-center gap-4 justify-between">
      <!-- Search Input -->
      <div class="relative w-full md:max-w-md">
        <span class="absolute inset-y-0 left-4 flex items-center text-slate-400">
          <Icon name="lucide:search" class="w-5 h-5" />
        </span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Rechercher par titre, contenu ou lieu..." 
          class="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full outline-none focus:border-indigo-500 focus:bg-white text-sm font-semibold shadow-sm transition-all"
        >
      </div>

      <!-- Quick Action Filters -->
      <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
        <button 
          :class="['px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 shadow-sm', 
            showOnlyMine 
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-500/25' 
              : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-50'
          ]" 
          @click="showOnlyMine = !showOnlyMine"
        >
          <Icon name="lucide:user" class="w-4 h-4" />
          <span>Mes souvenirs</span>
        </button>

        <button 
          :class="['px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 shadow-sm', 
            showBookmarked 
              ? 'bg-amber-500 border-amber-500 text-white shadow-amber-500/25' 
              : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-50'
          ]" 
          @click="showBookmarked = !showBookmarked"
        >
          <Icon name="lucide:bookmark" class="w-4 h-4" />
          <span>Signets</span>
        </button>
      </div>
    </div>

    <div class="container journal-body">
      <!-- Rich Posts Feed -->
      <div v-if="isLoading" class="loader-container">
        <Icon name="lucide:loader-2" class="spin main-loader" />
        <p>Ouverture du carnet de bord...</p>
      </div>

      <div v-else-if="filteredRichPosts.length === 0" class="empty-state">
        <Icon name="lucide:book-open" class="empty-icon" />
        <h2>Le journal est encore vierge.</h2>
        <p>Aucune page ne correspond à votre recherche ou filtre.</p>
      </div>

      <div v-else class="feed-grid">
        <JournalPostCard 
          v-for="post in filteredRichPosts" 
          :key="post.id" 
          :post="post" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRichPosts } from '~/composables/useRichPosts';
import { useAuth } from '~/composables/useAuth';
import JournalPostCard from '~/components/journal/JournalPostCard.vue';

const { richPosts, isLoading, fetchRichPosts } = useRichPosts();
const { user } = useAuth();

const searchQuery = ref('');
const showOnlyMine = ref(false);
const showBookmarked = ref(false);

const filteredRichPosts = computed(() => {
  let posts = richPosts.value || [];
  
  if (showOnlyMine.value && user.value) {
    posts = posts.filter(p => p.author.username === user.value?.username);
  }
  
  if (showBookmarked.value) {
    posts = posts.filter(p => p.is_bookmarked_by_me);
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    posts = posts.filter(p => 
      (p.title && p.title.toLowerCase().includes(query)) ||
      (p.caption && p.caption.toLowerCase().includes(query)) ||
      (p.location && p.location.toLowerCase().includes(query))
    );
  }
  
  return posts;
});

onMounted(fetchRichPosts);
useSeoMeta({ title: 'Le Journal — MSO20s' });
</script>

<style>
@import '~/assets/css/journal.css';
</style>
