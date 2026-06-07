<template>
  <header class="page-header container">
    <div class="header-content">
      <h1 class="page-title">Scoreboard</h1>
      <p class="page-subtitle">Qui est le champion d'Annecy ? <Icon name="lucide:swords" /></p>
    </div>
    <button @click="$emit('toggle-form')" class="btn-toggle-form" :class="{ 'btn-toggle-form--active': showForm }">
      {{ showForm ? 'Fermer' : 'Nouvelle Partie' }}
    </button>
  </header>
</template>

<script setup lang="ts">
defineProps<{ showForm: boolean }>();
defineEmits(['toggle-form']);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
.page-title { font-family: var(--font-display); font-size: 3.5rem; color: var(--clr-neutral-900); letter-spacing: -1px; }
.page-subtitle { color: var(--clr-primary-500); font-weight: 700; font-size: 1.1rem; }
.btn-toggle-form { background: #1a1a1a; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s; }
.btn-toggle-form--active { background: #ca75d6; }
</style>
