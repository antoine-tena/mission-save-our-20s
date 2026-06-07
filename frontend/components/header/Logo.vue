<template>
  <NuxtLink to="/" class="mso-logo" aria-label="Accueil MSO20s">
    <div class="mso-logo__icon">
      <Icon name="lucide:camera" />
    </div>
    <span class="mso-logo__text">MSO20s</span>
  </NuxtLink>
</template>

<style scoped>
.mso-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.mso-logo__icon { font-size: 24px; transform: rotate(-10deg); transition: transform 0.3s; }
.mso-logo:hover .mso-logo__icon { transform: rotate(10deg) scale(1.2); }
.mso-logo__text {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
}
</style>
