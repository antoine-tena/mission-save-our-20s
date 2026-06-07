<template>
  <div class="sky-map-container glass-card">
    <svg 
      viewBox="0 0 500 500" 
      class="sky-svg"
      @mousemove="handleMouseMove"
      @mouseleave="hoveredBody = null"
    >
      <!-- Background Sky -->
      <circle cx="250" cy="250" r="240" class="sky-bg" />
      
      <!-- Stars -->
      <g v-for="(star, i) in stars" :key="i">
        <circle 
          :cx="star.x" 
          :cy="star.y" 
          :r="star.r" 
          class="star"
          :class="{ 'is-hovered': hoveredBody?.name === star.name }"
          @click="$emit('select', star)"
          @mouseenter="hoveredBody = star"
        />
        <!-- Constellation Lines (Simulated) -->
        <line v-if="star.connectTo" 
          :x1="star.x" :y1="star.y" 
          :x2="star.connectTo.x" :y2="star.connectTo.y" 
          class="constellation-line" 
        />
      </g>

      <!-- Overlay Info on Hover -->
      <foreignObject v-if="hoveredBody" :x="hoveredBody.x + 10" :y="hoveredBody.y + 10" width="150" height="60">
        <div class="hover-tooltip">
          <strong>{{ hoveredBody.name }}</strong>
          <span>Mag: {{ hoveredBody.magnitude }}</span>
        </div>
      </foreignObject>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CelestialBody } from '~/types';

const props = defineProps<{
  stars: any[]; // Extended CelestialBody with x, y, r for SVG
}>();

defineEmits(['select']);

const hoveredBody = ref<any | null>(null);

const handleMouseMove = (e: MouseEvent) => {
  // Logic could go here for interactive parallax if needed
};
</script>

<style scoped>
.sky-map-container { background: #0b1026; padding: 1rem; border-radius: 50%; overflow: hidden; border: 4px solid #1a2040; }
.sky-svg { width: 100%; height: auto; cursor: crosshair; }
.sky-bg { fill: #0b1026; }
.star { fill: white; cursor: pointer; transition: all 0.2s; filter: blur(0.5px); }
.star:hover, .star.is-hovered { fill: #fff700; r: 4; filter: drop-shadow(0 0 5px #fff700); }
.constellation-line { stroke: rgba(255,255,255,0.1); stroke-width: 1; stroke-dasharray: 2; }
.hover-tooltip { background: rgba(0,0,0,0.8); color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; display: flex; flex-direction: column; pointer-events: none; border: 1px solid rgba(255,255,255,0.2); }
</style>
