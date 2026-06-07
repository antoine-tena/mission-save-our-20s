<template>
  <header class="main-header" :class="{ 'main-header--scrolled': isScrolled }">
    <div class="container main-header__inner">
      <NuxtLink to="/" class="logo" aria-label="Accueil Mission Save Our 20s">
        <img src="/logo.png" alt="Mission Save Our 20s" class="logo__img" />
        <span class="logo__text">MSO20s</span>
      </NuxtLink>

      <nav class="nav" aria-label="Navigation principale">
        <ul class="nav__list">
          <li class="nav__item">
            <NuxtLink to="/" class="nav__link">Accueil</NuxtLink>
          </li>
          <li class="nav__item">
            <NuxtLink to="/albumPhoto" class="nav__link">Album Photo</NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="header-actions">
        <template v-if="isAuthenticated">
          <span class="user-greeting">Salut, <strong>{{ user?.username }}</strong></span>
          <button class="btn-auth btn-auth--logout" @click="logout">
            Déconnexion
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="btn-auth btn-auth--login">
            Se connecter
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const { isAuthenticated, user, logout } = useAuth();
const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.main-header {
  height: var(--header-height);
  background: transparent;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-above);
  transition: 
    background var(--transition-normal),
    box-shadow var(--transition-normal),
    height var(--transition-normal);
}

.main-header--scrolled {
  background: var(--clr-neutral-0);
  box-shadow: var(--shadow-md);
  height: calc(var(--header-height) - 10px);
}

.main-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.logo__img {
  height: 40px;
  width: auto;
}

.logo__text {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--fw-bold);
  color: var(--clr-neutral-900);
}

/* Nav */
.nav__list {
  display: flex;
  list-style: none;
  gap: var(--space-6);
}

.nav__link {
  font-size: var(--text-sm);
  font-weight: var(--fw-medium);
  color: var(--clr-neutral-600);
  transition: color var(--transition-fast);
  padding: var(--space-2) var(--space-1);
  position: relative;
}

.nav__link:hover {
  color: var(--clr-primary-500);
}

.nav__link.router-link-active {
  color: var(--clr-primary-500);
}

.nav__link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--clr-primary-500);
  border-radius: var(--radius-full);
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.user-greeting {
  font-size: var(--text-sm);
  color: var(--clr-neutral-600);
}

.btn-auth {
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
  border: none;
  cursor: pointer;
  transition: transform var(--transition-fast), background var(--transition-fast);
}

.btn-auth--login {
  background: var(--clr-neutral-900);
  color: var(--clr-neutral-0);
}

.btn-auth--login:hover {
  background: var(--clr-neutral-800);
  transform: translateY(-1px);
}

.btn-auth--logout {
  background: var(--clr-neutral-100);
  color: var(--clr-neutral-700);
}

.btn-auth--logout:hover {
  background: var(--clr-neutral-200);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
</style>
