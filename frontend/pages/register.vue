<template>
  <div class="auth-page relative overflow-hidden bg-slate-50">
    <!-- Animated backdrop blobs -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] bg-fuchsia-300/20 rounded-full blur-[110px] animate-pulse" style="animation-duration: 8s;"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-300/25 rounded-full blur-[120px] animate-pulse" style="animation-duration: 10s;"></div>
    </div>

    <!-- Scrapbook floating stickers -->
    <div class="absolute inset-0 pointer-events-none z-0 select-none opacity-30" aria-hidden="true">
      <Icon name="lucide:heart" class="absolute text-fuchsia-400 text-5xl" style="top: 15%; left: 12%; transform: rotate(-15deg);" />
      <Icon name="lucide:camera" class="absolute text-indigo-400 text-5xl" style="top: 25%; right: 14%; transform: rotate(15deg);" />
      <Icon name="lucide:stars" class="absolute text-yellow-500 text-4xl" style="bottom: 22%; left: 16%; transform: rotate(5deg);" />
      <Icon name="lucide:sparkles" class="absolute text-fuchsia-500 text-4xl" style="bottom: 26%; right: 16%; transform: rotate(-10deg);" />
    </div>

    <AuthRegisterCard v-model="form" :loading="loading" :error="error" @submit="handleRegister" class="relative z-10 shadow-2xl backdrop-blur-md bg-white/90 border border-white/50" />
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
.auth-page {
  min-height: 100vh;
  padding-top: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}
</style>
