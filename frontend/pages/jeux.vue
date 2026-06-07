<template>
  <div class="games-page">
    <div class="mso-scrapbook-bg"></div>
    <GamesHeader :show-form="showAddForm" @toggle-form="showAddForm = !showAddForm" />

    <div class="container main-content">
      <GamesStatsSummary :stats="stats" />
      <Transition name="slide-fade">
        <GamesSessionForm v-if="showAddForm" v-model="newSession" :game-types="gameTypes" :is-submitting="isSubmitting" @submit="handleAddSession" />
      </Transition>
      <GamesSessionTimeline :sessions="sessions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGames } from '~/composables/useGames';
const { sessions, gameTypes, stats, isSubmitting, fetchAllData, createSession } = useGames();
const showAddForm = ref(false);
const newSession = ref({ game_type: null as number | null, date: new Date().toISOString().substr(0, 10), amani_score: 0, antoine_score: 0, location: '', notes: '' });
const handleAddSession = async () => { if (await createSession(newSession.value)) { showAddForm.value = false; resetForm(); } };
const resetForm = () => { newSession.value = { game_type: gameTypes.value[0]?.id || null, date: new Date().toISOString().substr(0, 10), amani_score: 0, antoine_score: 0, location: '', notes: '' }; };
onMounted(fetchAllData);
useSeoMeta({ title: 'Scoreboard — MSO20s' });
</script>

<style scoped>
.games-page { min-height: 100vh; padding-top: calc(var(--header-height) + 2rem); padding-bottom: 4rem; }
.mso-scrapbook-bg { position: fixed; inset: 0; background-color: #ffffff; background-image: radial-gradient(#ca75d611 1.5px, transparent 1.5px); background-size: 30px 30px; z-index: -1; }
.slide-fade-enter-active { transition: all 0.4s ease-out; }
.slide-fade-leave-active { transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1); }
.slide-fade-enter-from, .slide-fade-leave-to { transform: translateY(-20px); opacity: 0; }
</style>
