<template>
  <div ref="mapContainer" class="star-map-container">
    <div id="celestial-map"/>
    <div v-if="isLoading" class="map-loading-placeholder">
      <Icon name="lucide:loader-2" class="animate-spin" />
      <p>{{ loadingStatus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  config?: any;
}>();

const mapContainer = ref<HTMLElement | null>(null);
const isLoading = ref(true);
const loadingStatus = ref("Initialisation...");

onMounted(async () => {
  if (import.meta.server) return;

  const loadScript = (src: string, id: string) => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(id)) return resolve(true);
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.onload = () => setTimeout(resolve, 300);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  try {
    loadingStatus.value = "Chargement des moteurs...";
    await loadScript('/lib/d3-celestial/d3.v3.min.js', 'd3-v3');
    await loadScript('/lib/d3-celestial/d3.geo.projection.v0.min.js', 'd3-geo');
    await loadScript('/lib/d3-celestial/celestial.js', 'celestial-core');

    const Celestial = (window as any).Celestial;
    const d3 = (window as any).d3;

    if (!Celestial || !d3) throw new Error("Moteurs manquants.");

    loadingStatus.value = "Acquisition des données...";

    const config: any = {
      width: mapContainer.value?.clientWidth || window.innerWidth,
      height: mapContainer.value?.clientHeight || window.innerHeight - 100,
      projection: "stereographic", 
      transform: "equatorial",
      center: [165, 55, 1], 
      address: "Annecy, France",
      datapath: "/lib/d3-celestial/data/",
      stars: { show: true, limit: 6, colors: true, names: true, size: 5, data: 'stars.6.json' },
      dsos: { show: false },
      constellations: { show: true, names: true, lines: true, linestyle: { stroke: "#cccccc", width: 1.5, opacity: 0.8 } },
      mw: { show: true },
      lines: { graticule: { show: true, opacity: 0.1 } },
      background: { fill: "#0b1026", stroke: "#1a2040", width: 4 },
      interactive: true,
      controls: true,
      container: "celestial-map",
      form: false,
      location: false,
      ...props.config
    };

    setTimeout(() => {
      try {
        // Ensure container is measured
        config.width = mapContainer.value?.clientWidth || window.innerWidth;
        config.height = mapContainer.value?.clientHeight || window.innerHeight - 80;
        
        Celestial.display(config);
        setTimeout(() => { isLoading.value = false; }, 3000);
      } catch (e: any) {
        console.error("Internal Display Error:", e);
        loadingStatus.value = "Erreur de rendu interne.";
      }
    }, 500);

  } catch (error: any) {
    loadingStatus.value = "Erreur fatale : " + error.message;
  }
});

onUnmounted(() => {
  const container = document.getElementById('celestial-map');
  if (container) container.innerHTML = '';
});
</script>

<style scoped>
.star-map-container { 
  width: 100%; 
  height: 100%; 
  background: #050814; 
  position: relative; 
  overflow: hidden; 
}
#celestial-map { width: 100%; height: 100%; }
.map-loading-placeholder { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: #ca75d6; font-weight: 700; background: #050814; z-index: 50; }
:deep(canvas) { display: block !important; width: 100% !important; height: 100% !important; }
:deep(.celestial-controls) { background: rgba(11,16,38,0.9) !important; border-radius: 12px !important; padding: 10px !important; position: absolute !important; bottom: 20px !important; right: 20px !important; z-index: 100; }
</style>
