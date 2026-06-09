<template>
  <div class="profile-tabs-nav">
    <button 
      v-for="t in tabs" 
      :key="t.id" 
      class="tab-link" 
      :class="{ 'tab-link--active': activeTab === t.id }" 
      @click="$emit('update:activeTab', t.id)"
    >
      <span class="tab-icon">{{ t.icon }}</span>
      {{ t.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ activeTab: string }>();
defineEmits(['update:activeTab']);

const tabs = [
  { id: 'scrapbook', label: 'Espace Perso', icon: 'lucide:book-open' },
  { id: 'posts', label: 'Publications', icon: 'lucide:smartphone' },
  { id: 'info', label: 'À propos', icon: 'lucide:user' }
];
</script>

<style scoped>
.profile-tabs-nav {
  display: flex; justify-content: center; gap: 3rem;
  border-top: 1px solid var(--clr-neutral-200);
  margin-top: 2rem; padding: 1rem 0;
}
.tab-link {
  background: none; border: none; padding: 0.5rem 0;
  font-weight: 700; color: var(--clr-neutral-400); cursor: pointer;
  display: flex; align-items: center; gap: 8px; text-transform: uppercase;
  letter-spacing: 1px; font-size: 0.75rem; border-top: 2px solid transparent;
  margin-top: -1.1rem; transition: all 0.3s;
}
.tab-link--active {
  color: var(--clr-neutral-900);
  border-top-color: var(--clr-neutral-900);
}
.tab-icon { font-size: 1rem; }
</style>
