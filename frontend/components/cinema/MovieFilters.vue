<template>
  <div class="cinema-filters-bar glass-card">
    <div class="filters-main">
      <div class="search-box">
        <Icon name="lucide:search" class="icon" />
        <input 
          :value="search" 
          type="text" 
          placeholder="Rechercher..." 
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)" 
        >
      </div>

      <div class="select-group">
        <div class="select-item">
          <Icon name="lucide:clock" class="label-icon" />
          <select :value="sortBy" @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)">
            <option value="date-desc">Récent</option>
            <option value="date-asc">Ancien</option>
            <option value="title-asc">A-Z</option>
          </select>
        </div>

        <div class="select-item">
          <Icon name="lucide:clapperboard" class="label-icon" />
          <select :value="genre" @change="$emit('update:genre', ($event.target as HTMLSelectElement).value)">
            <option value="">Genres</option>
            <option v-for="g in availableGenres" :key="g" :value="g">{{ g }}</option>
          </select>
        </div>

        <div class="select-item rating-select">
          <Icon name="lucide:flower-2" class="label-icon amani-icon" />
          <select :value="ratingAmani" @change="$emit('update:ratingAmani', Number(($event.target as HTMLSelectElement).value))">
            <option :value="0">Amani</option>
            <option v-for="i in 5" :key="i" :value="i">{{ i }}+ ★</option>
          </select>
        </div>

        <div class="select-item rating-select">
          <Icon name="lucide:shield" class="label-icon antoine-icon" />
          <select :value="ratingAntoine" @change="$emit('update:ratingAntoine', Number(($event.target as HTMLSelectElement).value))">
            <option :value="0">Antoine</option>
            <option v-for="i in 5" :key="i" :value="i">{{ i }}+ ★</option>
          </select>
        </div>

        <div class="select-item rating-select">
          <Icon name="lucide:users" class="label-icon" />
          <select :value="ratingGlobal" @change="$emit('update:ratingGlobal', Number(($event.target as HTMLSelectElement).value))">
            <option :value="0">Global</option>
            <option v-for="i in 5" :key="i" :value="i">{{ i }}+ ★</option>
          </select>
        </div>
      </div>

      <button class="btn-reset" title="Réinitialiser" @click="$emit('reset')">
        <Icon name="lucide:rotate-ccw" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  search: string;
  genre: string;
  ratingAmani: number;
  ratingAntoine: number;
  ratingGlobal: number;
  year: string;
  sortBy: string;
  availableGenres: string[];
  availableYears: string[];
}>();

defineEmits(['update:search', 'update:genre', 'update:ratingAmani', 'update:ratingAntoine', 'update:ratingGlobal', 'update:year', 'update:sortBy', 'reset']);
</script>

<style scoped>
.cinema-filters-bar { margin-bottom: 2.5rem; padding: 0.6rem 1rem; border-radius: 100px; background: white; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
.filters-main { display: flex; align-items: center; gap: 0.75rem; }
.search-box { flex: 1.2; display: flex; align-items: center; background: #f8fafc; padding: 0.4rem 1rem; border-radius: 100px; border: 1px solid #e2e8f0; }
.search-box .icon { color: #94a3b8; margin-right: 8px; font-size: 0.9rem; }
.search-box input { width: 100%; border: none; background: none; font-family: inherit; font-size: 0.85rem; color: #1e293b; outline: none; }
.select-group { display: flex; gap: 0.4rem; flex: 3; }
.select-item { display: flex; align-items: center; background: #f8fafc; padding: 0.35rem 0.7rem; border-radius: 100px; border: 1px solid #e2e8f0; flex: 1; min-width: 0; }
.label-icon { color: #94a3b8; font-size: 0.8rem; margin-right: 5px; flex-shrink: 0; }
.amani-icon { color: #f472b6; }
.antoine-icon { color: #60a5fa; }
.select-item select { width: 100%; border: none; background: none; font-family: inherit; font-size: 0.75rem; font-weight: 700; color: #475569; outline: none; cursor: pointer; }
.btn-reset { width: 36px; height: 36px; border-radius: 50%; border: none; background: #f1f5f9; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.btn-reset:hover { background: #ca75d622; color: #ca75d6; transform: rotate(-180deg); }
@media (max-width: 1100px) { .cinema-filters-bar { border-radius: 20px; } .filters-main { flex-direction: column; align-items: stretch; } .select-group { flex-wrap: wrap; } .select-item { flex: 1 1 calc(33% - 0.4rem); } }
@media (max-width: 600px) { .select-item { flex: 1 1 calc(50% - 0.4rem); } }
</style>
