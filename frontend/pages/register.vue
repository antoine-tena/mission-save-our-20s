<template>
  <div class="auth-page">
    <AuthRegisterCard v-model="form" :loading="loading" :error="error" @submit="handleRegister" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { register } = useAuth();
const router = useRouter();
const form = ref({ username: '', email: '', password: '' });
const loading = ref(false);
const error = ref('');

async function handleRegister() {
  loading.value = true; error.value = '';
  const result = await register(form.value.username, form.value.password, form.value.email);
  if (result.success) router.push('/');
  else error.value = result.error || 'Erreur inscription';
  loading.value = false;
}
definePageMeta({ layout: 'default' });
</script>

<style scoped>
.auth-page { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: var(--space-4); }
</style>
