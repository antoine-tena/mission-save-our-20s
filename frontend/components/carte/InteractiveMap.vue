<template>
  <main class="carte-main">
    <div id="mso-map" class="mso-map-canvas"/>
    <CarteMapLegend />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import { formatDate } from '~/utils/formatters';
import type { Photo, Movie } from '~/types';

const props = defineProps<{ photos: Photo[]; movies?: Movie[] }>();
let map: any = null; 
const markers = new Map<string, any>();
let L: any = null;

const renderMarkers = () => {
  if (!map || !L) return;

  // Clear existing markers first to avoid duplicates
  markers.forEach(m => map.removeLayer(m));
  markers.clear();

  props.photos.forEach(p => {
    if (p.latitude !== null && p.longitude !== null) {
      const popupHtml = `
        <div class="map-popup photo-popup">
          <img src="${p.image_url}" class="popup-img" />
          <div class="popup-content">
            <h3>${p.titre}</h3>
            <p style="display: flex; align-items: center; gap: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #94a3b8"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              ${formatDate(p.date_creation)}
            </p>
          </div>
        </div>
      `;
      const m = L.marker([p.latitude, p.longitude]).addTo(map).bindPopup(popupHtml, { maxWidth: 280, className: 'mso-leaflet-popup' });
      markers.set(`photo-${p.id}`, m);
    }
  });

  props.movies?.forEach(m => {
    if (m.latitude !== null && m.longitude !== null) {
      const marker = L.circleMarker([m.latitude, m.longitude], { radius: 12, fillColor: "#1a1a1a", color: "#fff", weight: 3, opacity: 1, fillOpacity: 0.9 }).addTo(map);
      const poster = m.poster_url || '/placeholder-movie.png';
      const popupHtml = `
        <div class="map-popup movie-popup" style="cursor: pointer" onclick="window.location.href='/cinema?id=${m.id}'">
          <img src="${poster}" class="popup-img" onerror="this.src='/placeholder-movie.png'" />
          <div class="popup-content">
            <h3 style="display: flex; align-items: center; gap: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #ca75d6"><path d="M20.2 6 3 11l-.9-2.4c-.3-.7-.1-1.4.5-1.9l12.1-5.9c.7-.3 1.4-.1 1.9.5Z"/><path d="m20.2 6 3.3 8.9c.2.7-.1 1.4-.9 1.6l-18 6.5c-.7.2-1.4-.1-1.6-.9L0 13.2"/><path d="M2 8v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2Z"/><path d="m7 8 5 5 5-5"/></svg>
              ${m.title}
            </h3>
            <p style="display: flex; align-items: center; gap: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #94a3b8"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              ${formatDate(m.date_seen)}
            </p>
            <p class="popup-hint" style="color: #ca75d6; font-weight: 700; margin-top: 8px; font-size: 0.7rem; display: flex; align-items: center; gap: 4px; text-transform: uppercase;">
              VOIR LA CRITIQUE 
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </p>
          </div>
        </div>
      `;
      marker.bindPopup(popupHtml, { maxWidth: 280, className: 'mso-leaflet-popup' });
      markers.set(`movie-${m.id}`, marker);
    }
  });
};

const initMap = async () => {
  if (import.meta.server) return;
  L = await import('leaflet'); 
  import('leaflet/dist/leaflet.css');
  
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({ iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png' });

  map = L.map('mso-map', { zoomControl: false, scrollWheelZoom: true }).setView([45.8992, 6.1293], 13);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { subdomains: 'abcd', maxZoom: 20 }).addTo(map);

  renderMarkers();
};

watch(() => [props.photos, props.movies], renderMarkers, { deep: true });

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
