<template>
  <div class="mso-actions">
    <template v-if="isAuthenticated">
      <NuxtLink to="/profile" class="mso-user-pill">
        <ProfileAvatar size="sm" class="mso-user-pill__avatar" :username="username" />
        <span class="mso-user-pill__name">{{ username }}</span>
      </NuxtLink>
      <button class="mso-btn-logout" title="Déconnexion" @click="$emit('logout')">
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
.mso-actions { display: flex; align-items: center; gap: 0.75rem; }

.mso-user-pill {
  background: #f8fafc;
  padding: 4px 12px 4px 4px;
  border-radius: 100px;
  color: var(--clr-neutral-900);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.8rem;
  border: 1px solid #f1f5f9;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.mso-user-pill:hover {
  background: white;
  border-color: var(--clr-primary-300);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.mso-user-pill__avatar {
  width: 28px;
  height: 28px;
  background: var(--clr-primary-500);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.mso-btn-logout {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  padding: 8px;
  border-radius: 50%;
}

.mso-btn-logout:hover {
  color: #ef4444;
  background: #fef2f2;
}

.mso-btn-login {
  color: var(--clr-primary-600);
  text-decoration: none;
  font-weight: 800;
  font-size: 0.85rem;
  background: #fff0f9;
  padding: 8px 20px;
  border-radius: 12px;
  transition: all 0.3s;
}

.mso-btn-login:hover {
  background: var(--clr-primary-500);
  color: white;
  box-shadow: 0 4px 14px rgba(202, 117, 214, 0.3);
}
</style>
