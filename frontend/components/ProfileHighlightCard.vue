<template>
  <ScrapbookCard :tape-color="themeColor">
    <div class="avatar-large" :style="{ background: avatarBg }">
      {{ initial }}
    </div>
    <div class="card-content">
      <p class="intro" v-html="introText"></p>
      <p v-html="bodyText"></p>
    </div>
  </ScrapbookCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  username: string;
}>();

const initial = computed(() => props.username.charAt(0).toUpperCase());

const themeColor = computed(() => {
  return props.username === 'antoine' 
    ? 'rgba(59, 130, 246, 0.2)' 
    : 'rgba(202, 117, 214, 0.2)';
});

const avatarBg = computed(() => {
  return props.username === 'antoine' ? '#3b82f6' : '#ca75d6';
});

const introText = computed(() => {
  if (props.username === 'antoine') {
    return `Architecte de la donnée le jour, sauveur de nos 20 ans la nuit. Arrivé d'<strong>Annecy-Chambéry</strong> pour conquérir les sommets (et le coeur d'une parisienne).`;
  }
  return `Originaire de <strong>Paris 11</strong>, libérée du joug de la CPGE au <strong>Lycée Voltaire</strong>, je redécouvre la liberté entre les montagnes d'Annecy.`;
});

const bodyText = computed(() => {
  if (props.username === 'antoine') {
    return `Ce carnet compile les algorithmes de nos sorties, les stats de nos bowlings et les archives de nos meilleures randos.`;
  }
  return `Ce carnet est ma cachette. Mes photos, mes notes, mes victoires au billard (rares mais précieuses).`;
});
</script>

<style scoped>
.avatar-large {
  width: 100px;
  height: 100px;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px v-bind('props.username === "antoine" ? "rgba(59, 130, 246, 0.3)" : "rgba(202, 117, 214, 0.3)"');
}

.card-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444;
}

.intro { margin-bottom: 1.5rem; }
</style>
