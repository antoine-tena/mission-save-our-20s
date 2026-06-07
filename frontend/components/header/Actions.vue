<template>
  <div class="mso-actions">
    <template v-if="isAuthenticated">
      <NuxtLink to="/profile" class="mso-user-pill">
        <span class="mso-user-pill__name">{{ username }}</span>
      </NuxtLink>
      <button class="mso-btn-logout" @click="$emit('logout')" title="Déconnexion">
        <Icon name="lucide:log-out" />
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
