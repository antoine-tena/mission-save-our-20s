<template>
  <div class="mso-journal writing-zen-mode">
    <div class="journal-bg"></div>
    
    <!-- Animated modern background -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-300/20 rounded-full blur-[120px] animate-pulse" style="animation-duration: 8s;"></div>
      <div class="absolute bottom-[0%] left-[-10%] w-[30rem] h-[30rem] bg-fuchsia-300/20 rounded-full blur-[100px] animate-pulse" style="animation-duration: 10s;"></div>
    </div>

    <!-- Header bar for focus mode -->
    <header class="zen-header container mx-auto px-4 relative z-10 flex items-center justify-between py-6 mb-8">
      <NuxtLink to="/journal" class="zen-back-btn group">
        <Icon name="lucide:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Retour au Journal</span>
      </NuxtLink>
      <div class="zen-brand">
        <Icon name="lucide:feather" class="w-5 h-5 text-indigo-500 animate-bounce" />
        <span class="font-display font-bold text-slate-800">Mode Écriture Zen</span>
      </div>
    </header>

    <div class="container relative z-10 px-4">
      <JournalCreateForm ref="createFormRef" @submit="onFormSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRichPosts } from '~/composables/useRichPosts';
import JournalCreateForm from '~/components/journal/JournalCreateForm.vue';

// Disable default layout (no header, no footer!)
definePageMeta({
  layout: false
});

const { createRichPost } = useRichPosts();
const createFormRef = ref<any>(null);

const onFormSubmit = async (fd: FormData) => {
  if (await createRichPost(fd)) {
    createFormRef.value?.resetForm();
    // Redirect back to journal after success!
    navigateTo('/journal');
  } else {
    createFormRef.value.isSubmitting = false;
  }
};

useSeoMeta({ title: 'Écrire une page — MSO20s' });
</script>

<style scoped>
@import '~/assets/css/journal.css';

.writing-zen-mode {
  padding-top: 0 !important; /* Overrides global padding top for focus mode */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.zen-header {
  border-b: 1px solid rgba(241, 245, 249, 0.5);
}

.zen-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: #64748b;
  transition: color 0.2s;
}

.zen-back-btn:hover {
  color: #6366f1;
}

.zen-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}
</style>
