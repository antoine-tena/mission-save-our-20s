<template>
  <div class="mso-journal-card">
    <div class="mso-journal-card__tape"></div>
    <div class="mso-journal-card__content">
      <header class="mso-journal-card__header">
        <span class="mso-journal-card__date">Janvier 2026 — Annecy</span>
        <h2 class="mso-journal-card__subtitle">Le début de l'archive immuable</h2>
      </header>
      <HomeJournalCardBody />
      <div class="mso-journal-card__actions">
        <NuxtLink to="/albumPhoto" class="mso-btn-primary">
          Ouvrir l'Album Photo
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mso-journal-card { background: white; padding: 4rem; border-radius: 2px; box-shadow: 0 30px 80px rgba(0,0,0,0.08); position: relative; transform: rotate(-1.5deg); border: 1px solid #efefef; width: 100%; }
.mso-journal-card__tape { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); width: 140px; height: 45px; background: rgba(202, 117, 214, 0.25); backdrop-filter: blur(4px); z-index: 5; clip-path: polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%); }
.mso-journal-card__header { margin-bottom: 3rem; border-bottom: 1px dashed #ddd; padding-bottom: 1.5rem; }
.mso-journal-card__date { font-family: var(--font-display); font-size: 1.3rem; color: #ca75d6; font-weight: 700; }
.mso-journal-card__subtitle { font-size: 1rem; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-top: 0.5rem; }
.mso-btn-primary { display: inline-flex; align-items: center; gap: 15px; background: #1a1a1a; color: white; padding: 1.2rem 3rem; border-radius: 60px; text-decoration: none; font-weight: 800; font-size: 1.1rem; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
.mso-btn-primary:hover { background: #ca75d6; transform: translateY(-5px) rotate(1deg); box-shadow: 0 15px 35px rgba(202, 117, 214, 0.4); }
@media (max-width: 768px) { .mso-journal-card { padding: 2.5rem; transform: none; } }
</style>
