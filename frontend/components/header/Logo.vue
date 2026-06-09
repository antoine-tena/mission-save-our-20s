<template>
  <NuxtLink to="/" class="mso-logo" aria-label="Accueil MSO20s">
    <div class="mso-logo__icon-box">
      <Icon name="lucide:camera" class="logo-icon" />
    </div>
    <div class="mso-logo__text-group">
      <span class="mso-logo__text">MSO20s</span>
      <span class="mso-logo__tagline">Mission Save Our 20s</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.mso-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.mso-logo__icon-box {
  width: 40px;
  height: 40px;
  background: var(--clr-primary-500);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(202, 117, 214, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mso-logo:hover .mso-logo__icon-box {
  transform: rotate(-5deg) scale(1.1);
  box-shadow: 0 6px 16px rgba(202, 117, 214, 0.4);
}

.mso-logo__text-group {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.mso-logo__text {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--clr-neutral-900);
  letter-spacing: -0.5px;
}

.mso-logo__tagline {
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--clr-primary-500);
  letter-spacing: 1px;
  margin-top: 2px;
}

@media (max-width: 640px) {
  .mso-logo__tagline { display: none; }
}
</style>
