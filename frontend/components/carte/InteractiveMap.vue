<template>
  <main class="carte-main">
    <div id="mso-map" class="mso-map-canvas"></div>
    <CarteMapLegend />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { formatDate } from '~/utils/formatters';
import type { Photo, Movie } from '~/types';

const props = defineProps<{ photos: Photo[]; movies?: Movie[] }>();
let map: any = null; const markers = new Map<string, any>();

const initMap = async () => {
  if (process.server) return;
  const L = await import('leaflet'); import('leaflet/dist/leaflet.css');
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({ iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

  map = L.map('mso-map', { zoomControl: false, scrollWheelZoom: true }).setView([45.8992, 6.1293], 13);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 20 }).addTo(map);

  props.photos.forEach(p => {
    if (p.latitude && p.longitude) {
      const m = L.marker([p.latitude, p.longitude]).addTo(map).bindPopup(`<div class="map-popup"><img src="${p.image_url}" class="popup-img" /><div class="popup-content"><h3>${p.titre}</h3><p>${formatDate(p.date_creation)}</p></div></div>`, { maxWidth: 280, className: 'mso-leaflet-popup' });
      markers.set(`photo-${p.id}`, m);
    }
  });

  props.movies?.forEach(m => {
    if (m.latitude && m.longitude) {
      const marker = L.circleMarker([m.latitude, m.longitude], { radius: 12, fillColor: "#1a1a1a", color: "#fff", weight: 3, opacity: 1, fillOpacity: 0.9 }).addTo(map);
      marker.bindPopup(`<div class="map-popup"><img src="${m.poster_url}" class="popup-img" /><div class="popup-content"><h3>${m.title}</h3><p>${m.location}</p></div></div>`, { maxWidth: 280, className: 'mso-leaflet-popup' });
      markers.set(`movie-${m.id}`, marker);
    }
  });
};

const focusOn = (type: string, id: number) => { 
  const m = markers.get(`${type}-${id}`);
  if (m) { map.setView(m.getLatLng(), 16); m.openPopup(); }
};
defineExpose({ focusOn });
onMounted(initMap);
onUnmounted(() => { if (map) map.remove(); });
</script>

<style scoped>
.carte-main { position: relative; height: 100%; }
.mso-map-canvas { width: 100%; height: 100%; }
:deep(.mso-leaflet-popup) .leaflet-popup-content-wrapper { border-radius: 16px; padding: 0; overflow: hidden; box-shadow: 0 15px 45px rgba(0,0,0,0.15); }
:deep(.map-popup) { width: 250px; }
:deep(.popup-img) { width: 100%; height: 150px; object-fit: cover; display: block; }
:deep(.popup-content) { padding: 1rem; }
:deep(.popup-content h3) { font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 5px; }
:deep(.popup-content p) { font-size: 0.75rem; font-weight: 700; color: #999; text-transform: uppercase; }
</style>
