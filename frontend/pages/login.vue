<template>
  <div class="auth-page">
    <AuthLoginCard v-model="form" :loading="loading" :error="error" @submit="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { login } = useAuth();
const router = useRouter();
const form = ref({ username: '', password: '' });
const loading = ref(false);
const error = ref('');

async function handleLogin() {
  loading.value = true; error.value = '';
  const result = await login(form.value.username, form.value.password);
  if (result.success) router.push('/');
  else error.value = result.error || 'Erreur connexion';
  loading.value = false;
}
definePageMeta({ layout: 'default' });
</script>

<style scoped>
.auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: var(--space-4); }
</style>
