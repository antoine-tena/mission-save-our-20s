<template>
  <div class="mso-actions">
    <template v-if="isAuthenticated">
      <NuxtLink to="/profile" class="mso-user-pill">
        <span class="mso-user-pill__name">{{ username }}</span>
      </NuxtLink>
      <button class="mso-btn-logout" @click="$emit('logout')" title="Déconnexion">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    </template>
    <template v-else>
      <NuxtLink to="/login" class="mso-btn-login">Connexion</NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isAuthenticated: boolean;
  username?: string;
}>();
defineEmits(['logout']);
</script>

<style scoped>
.mso-actions { display: flex; align-items: center; gap: 1rem; }
.mso-user-pill {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 16px; border-radius: 20px; color: white; text-decoration: none;
  font-weight: 600; font-size: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s;
}
.mso-user-pill:hover { background: white; color: #ca75d6; }
.mso-btn-logout { background: none; border: none; color: white; cursor: pointer; opacity: 0.8; transition: opacity 0.3s; display: flex; }
.mso-btn-logout:hover { opacity: 1; }
.mso-btn-login {
  color: white; text-decoration: none; font-weight: 800; border: 2px solid white;
  padding: 8px 20px; border-radius: 12px; transition: all 0.3s;
}
.mso-btn-login:hover { background: white; color: #ca75d6; }
</style>
