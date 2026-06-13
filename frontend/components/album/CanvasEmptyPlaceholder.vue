<template>
  <div class="canvas-empty-placeholder">
    <Icon name="lucide:image-plus" class="empty-icon-pulse" />
    <div class="empty-text-stack">
      <span class="empty-title">Page Album Souvenirs</span>
      <span class="empty-subtitle">Glissez-déposez des photos de la galerie ici</span>
    </div>
  </div>
</template>

<style scoped>
/* Premium tactile empty canvas placeholder */
.canvas-empty-placeholder {
  position: absolute;
  inset: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px dashed rgba(197, 168, 128, 0.45);
  background-color: rgba(250, 249, 246, 0.55);
  border-radius: 12px;
  text-align: center;
}

.empty-icon-pulse {
  font-size: 2.2rem;
  color: #c5a880;
  margin-bottom: 0.75rem;
  animation: pulseEffect 2s infinite ease-in-out;
}

.empty-text-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.empty-title {
  font-family: 'Playfair Display', serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #52473e;
}

.empty-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  color: #8c7e6e;
  max-width: 180px;
  line-height: 1.4;
}

@keyframes pulseEffect {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.08); opacity: 1; }
}
</style>