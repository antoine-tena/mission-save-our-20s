<template>
  <nav class="mso-nav">
    <ul class="mso-nav__list">
      <li><NuxtLink to="/albumPhoto" class="mso-nav__link">Album</NuxtLink></li>
      <li><NuxtLink to="/carte" class="mso-nav__link">Carte</NuxtLink></li>
      <li><NuxtLink to="/cinema" class="mso-nav__link">Cinéma</NuxtLink></li>
      <li><NuxtLink to="/jeux" class="mso-nav__link">Jeux</NuxtLink></li>
      <li><NuxtLink to="/wishlist" class="mso-nav__link">Wishlist</NuxtLink></li>
      <li><NuxtLink to="/calendrier" class="mso-nav__link">Agenda</NuxtLink></li>
      <li><NuxtLink to="/etoiles" class="mso-nav__link">Étoiles</NuxtLink></li>
      <li><NuxtLink to="/amani" class="mso-nav__link mso-nav__link--amani">Espace Amani</NuxtLink></li>
      <li>
        <button @click="$emit('antoine-click')" class="mso-nav__link mso-nav__link--antoine">
          Espace Antoine
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineEmits(['antoine-click']);
</script>

<style scoped>
.mso-nav__list { display: flex; list-style: none; gap: 1.5rem; margin: 0; padding: 0; }
.mso-nav__link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s;
  background: none; border: none; cursor: pointer;
}
.mso-nav__link:hover { color: white; background: rgba(255, 255, 255, 0.15); }
.mso-nav__link--amani:hover { background: #fff0f9; color: #c40e75ff; }
.mso-nav__link--antoine:hover { background: #f4fafe; color: #3b82f6; }

@media (max-width: 1024px) { .mso-nav { display: none; } }
</style>
