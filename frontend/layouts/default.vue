<template>
  <div class="app-layout">
    <Header />
    <main class="main-content">
      <slot />
    </main>
    <footer class="main-footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Mission Save Our 20s. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.main-footer {
  padding-block: var(--space-8);
  border-top: 1px solid var(--clr-neutral-200);
  background: var(--clr-neutral-0);
  text-align: center;
  color: var(--clr-neutral-500);
  font-size: var(--text-sm);
}
</style>
