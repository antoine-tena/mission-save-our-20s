<template>
  <div class="home-page">
    <section class="hero">
      <div class="container hero__inner">
        <h1 class="hero__title">Mission Save Our 20s</h1>
        <p class="hero__subtitle">Rejoignez l'aventure collective pour sauver nos plus belles années.</p>
        <div class="hero__actions">
          <NuxtLink to="/albumPhoto" class="btn btn--primary">Voir l'album</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Accueil — Mission Save Our 20s',
  description: 'Bienvenue sur le site officiel de la Mission Save Our 20s.',
})
</script>

<style scoped>
.hero {
  padding-block: var(--space-20);
  background: linear-gradient(135deg, var(--clr-primary-50) 0%, var(--clr-neutral-50) 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: calc(var(--header-height) + var(--space-10));
}

.hero__title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: var(--fw-bold);
  color: var(--clr-neutral-900);
  margin-bottom: var(--space-4);
}

.hero__subtitle {
  font-size: var(--text-xl);
  color: var(--clr-neutral-600);
  max-width: 60ch;
  margin-inline: auto;
  margin-bottom: var(--space-8);
}

.btn {
  display: inline-block;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-full);
  font-weight: var(--fw-bold);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn--primary {
  background: var(--clr-primary-500);
  color: var(--clr-neutral-0);
  box-shadow: var(--shadow-primary);
}

.btn--primary:hover {
  background: var(--clr-primary-600);
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary-lg);
}
</style>

