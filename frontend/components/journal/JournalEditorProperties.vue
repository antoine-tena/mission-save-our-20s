<template>
  <div class="properties-editor-box mt-6">
    <!-- Property Row: Lieu -->
    <div class="property-row">
      <div class="property-label">
        <Icon name="lucide:map-pin" class="property-icon text-indigo-500" />
        <span>Lieu de l'aventure</span>
      </div>
      <div class="property-value">
        <LocationAutocomplete 
          :model-value="location" 
          placeholder="Ajouter un lieu principal..." 
          class="property-input-autocomplete"
          :show-icon="false"
          @select="$emit('select-location', $event)"
          @update:model-value="$emit('update:location', $event)"
        />
      </div>
    </div>

    <!-- Property Row: Date -->
    <div class="property-row">
      <div class="property-label">
        <Icon name="lucide:calendar" class="property-icon text-fuchsia-500" />
        <span>Date du souvenir</span>
      </div>
      <div class="property-value">
        <input 
          type="date" 
          :model-value="eventDate" 
          class="property-input-field"
          @input="$emit('update:eventDate', ($event.target as HTMLInputElement).value)"
        >
      </div>
    </div>

    <!-- Property Row: Heure -->
    <div class="property-row">
      <div class="property-label">
        <Icon name="lucide:clock" class="property-icon text-amber-500" />
        <span>Heure précise (opt.)</span>
      </div>
      <div class="property-value">
        <input 
          type="time" 
          :model-value="eventTime" 
          class="property-input-field"
          @input="$emit('update:eventTime', ($event.target as HTMLInputElement).value)"
        >
      </div>
    </div>

    <!-- Tiny inline Open-Meteo automation row -->
    <div class="property-row inline-automation-row">
      <div class="property-label">
        <Icon name="lucide:cloud-lightning" class="property-icon text-sky-500" />
        <span>Données Météo</span>
      </div>
      <div class="property-value text-xs text-slate-500 font-semibold flex items-center gap-1.5 pl-2">
        <span>Calcul historique réel via</span>
        <span class="open-meteo-badge">Open-Meteo API</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LocationAutocomplete from '~/components/LocationAutocomplete.vue';

defineProps<{
  location: string;
  eventDate: string;
  eventTime: string;
}>();

defineEmits<{
  (e: 'update:location', value: string): void;
  (e: 'update:eventDate', value: string): void;
  (e: 'update:eventTime', value: string): void;
  (e: 'select-location', value: any): void;
}>();
</script>

<style scoped>
/* Notion-Style Compact Properties Block */
.properties-editor-box {
  background: white !important;
  border: 1px solid #f1f5f9 !important;
  border-radius: 20px !important;
  padding: 1rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.5rem !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02) !important;
}

.property-row {
  display: flex !important;
  align-items: center !important;
  border-radius: 8px !important;
  padding: 0.35rem 0.5rem !important;
  transition: background 0.2s ease !important;
}

.property-row:hover {
  background: #f8fafc !important;
}

.property-label {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  width: 170px !important;
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  color: #64748b !important;
  flex-shrink: 0 !important;
}

.property-icon {
  width: 1.1rem !important;
  height: 1.1rem !important;
}

.property-value {
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
}

.property-input-field {
  width: 100% !important;
  background: transparent !important;
  border: none !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  color: #334155 !important;
  outline: none !important;
  padding: 0.15rem 0.5rem !important;
  border-radius: 4px !important;
  transition: all 0.2s ease !important;
}

.property-input-field:focus {
  background: #f1f5f9 !important;
}

:deep(.property-input-autocomplete) {
  width: 100% !important;
}

:deep(.property-input-autocomplete input) {
  border: none !important;
  background: transparent !important;
  padding: 0.15rem 0.5rem !important;
  font-size: 0.85rem !important;
  font-weight: 600 !important;
  color: #334155 !important;
  border-radius: 4px !important;
}

:deep(.property-input-autocomplete input:focus) {
  background: #f1f5f9 !important;
  box-shadow: none !important;
}

.inline-automation-row {
  border-top: 1px solid #f1f5f9 !important;
  margin-top: 0.25rem !important;
  padding-top: 0.6rem !important;
}

.open-meteo-badge {
  background: #e0f2fe !important;
  color: #0369a1 !important;
  padding: 0.1rem 0.4rem !important;
  border-radius: 6px !important;
  font-size: 0.65rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.025em !important;
  text-transform: uppercase !important;
}
</style>
