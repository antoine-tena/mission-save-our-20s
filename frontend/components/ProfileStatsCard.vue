<template>
  <ScrapbookCard :tape="tapeOrientation" :tape-color="themeColor" class="stats-card">
    <h3 :style="{ color: titleColor }">{{ title }}</h3>
    <div class="stats-list">
      <div class="stat-row" :style="{ borderBottomColor: separatorColor }">
        <span class="label">{{ label1 }}</span>
        <span class="value" :style="{ color: valueColor }">{{ value1 }}</span>
      </div>
      <div class="stat-row" :style="{ borderBottomColor: separatorColor }">
        <span class="label">{{ label2 }}</span>
        <span class="value" :style="{ color: valueColor }">{{ value2 }}</span>
      </div>
      <div class="stat-row" :style="{ borderBottomColor: separatorColor }">
        <span class="label">{{ label3 }}</span>
        <span class="value" :style="{ color: valueColor }">{{ points }} XP</span>
      </div>
    </div>
  </ScrapbookCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  points: number;
  username: string;
}>();

const isAntoine = computed(() => props.username === 'antoine');

const tapeOrientation = computed(() => isAntoine.value ? 'corner-left' : 'corner');

const themeColor = computed(() => {
  return isAntoine.value 
    ? 'rgba(59, 130, 246, 0.2)' 
    : 'rgba(202, 117, 214, 0.2)';
});

const title = computed(() => isAntoine.value ? 'Métriques' : 'Registres');

const titleColor = computed(() => isAntoine.value ? '#1d4ed8' : '#c40e75');
const valueColor = computed(() => isAntoine.value ? '#1d4ed8' : '#c40e75');
const separatorColor = computed(() => isAntoine.value ? '#3b82f644' : '#ca75d644');

const label1 = computed(() => isAntoine.value ? 'Base' : 'Origine');
const value1 = computed(() => isAntoine.value ? 'Lyon (69)' : 'Paris 75011');

const label2 = computed(() => isAntoine.value ? 'Formation' : 'Parcours');
const value2 = computed(() => isAntoine.value ? 'Polytech Data' : 'CPGE Voltaire');

const label3 = computed(() => isAntoine.value ? 'Score Mission' : 'Points Mission');
</script>

<style scoped>
.stats-card h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed;
}

.stat-row .label { font-size: 0.8rem; text-transform: uppercase; font-weight: 800; color: #999; }
.stat-row .value { font-weight: 700; }
</style>
