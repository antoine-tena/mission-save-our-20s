<template>
  <div class="app-layout" :class="{ 'flex h-screen w-full overflow-hidden bg-[#fafafa]': isAuthenticated }">
    <!-- 1. LA SIDEBAR (Gauche) - Rendu conditionnel si authentifié -->
    <Sidebar v-if="isAuthenticated" />

    <!-- 2. LE CONTENU PRINCIPAL (Droite) -->
    <main 
      :class="[
        isAuthenticated 
          ? 'flex-1 h-screen overflow-y-auto px-4 md:px-12 py-8 relative' 
          : 'auth-container w-full min-h-screen bg-slate-50'
      ]"
    >
      <slot />
    </main>

    <!-- Overlay global de Notifications Toasts -->
    <ToastOverlay />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const { isAuthenticated } = useAuth();
</script>

<style>
/* Réinitialisation de base pour notre layout fullscreen */
html, body, #__nuxt {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* Redéfinir la hauteur de l'ancien header horizontal à 0px pour adapter automatiquement toutes les pages existantes ! */
:root {
  --header-height: 0px !important;
}
</style>
