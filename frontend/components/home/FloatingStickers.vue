<template>
  <div class="mso-stickers" aria-hidden="true">
    <Icon 
      v-for="(iconName, index) in stickers" 
      :key="index" 
      :name="iconName"
      class="mso-sticker"
      :style="getStickerStyle(index)"
    />
  </div>
</template>

<script setup lang="ts">
const stickers = [
  'lucide:mountain', 'lucide:flower-2', 'lucide:stars', 'lucide:plane', 
  'lucide:trees', 'lucide:flower', 'lucide:glass-water', 'lucide:circle-dot', 
  'lucide:popcorn', 'lucide:camera', 'lucide:film', 'lucide:milky-way'
];

const getStickerStyle = (index: number) => {
  const seed = index * 137.5;
  return {
    top: `${(seed % 85) + 5}%`,
    left: `${((seed * 1.6) % 90) + 5}%`,
    animationDuration: `${12 + (seed % 15)}s`,
    animationDelay: `${-(seed % 20)}s`,
    transform: `rotate(${(seed % 40) - 20}deg)`
  };
};
</script>

<style scoped>
.mso-stickers {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.mso-sticker {
  position: absolute;
  font-size: 2.2rem;
  opacity: 0.35;
  filter: saturate(0.8) contrast(0.9);
  animation: floatAround linear infinite;
  will-change: transform;
}

@keyframes floatAround {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(20px, -40px) rotate(5deg); }
  66% { transform: translate(-15px, -60px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
</style>
