<template>
  <section class="mso-hero container">
    <div class="mso-mission-badge">
      <span class="mso-mission-badge__pulse"/>
      Mission : Sauver nos 20 ans
    </div>

    <h1 class="mso-title">
      Amani <span class="mso-title__amp">&</span> Antoine
    </h1>

    <slot />
  </section>
</template>

<style scoped>
.mso-hero {
  position: relative; z-index: 10; max-width: 850px;
  display: flex; flex-direction: column; align-items: center;
}
.mso-mission-badge {
  background: #ca75d6; color: white; padding: 8px 20px; border-radius: 50px;
  font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 3px;
  display: flex; align-items: center; gap: 10px; margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(202, 117, 214, 0.3);
}
.mso-mission-badge__pulse {
  width: 10px; height: 10px; background: white; border-radius: 50%;
  animation: pulseBadge 2s infinite;
}
@keyframes pulseBadge { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
.mso-title {
  font-family: var(--font-display); font-size: clamp(3rem, 12vw, 5.5rem);
  color: #1a1a1a; text-align: center; margin-bottom: 4rem; line-height: 0.9; letter-spacing: -2px;
}
.mso-title__amp { color: #ca75d6; font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400; margin: 0 0.5rem; }
</style>
