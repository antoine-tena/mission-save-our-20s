<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const { fetchUser } = useAuth();

onMounted(async () => {
  await fetchUser();
});
</script>
