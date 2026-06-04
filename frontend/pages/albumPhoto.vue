<template>
  <div class="album-page">
    <h1>Notre Album Photo</h1>
  </div>
  <div class="action-section"> 
    <button>Ajouter une photo</button>
    <form @submit.prevent="ajouterPhoto">
      <input v-model="titre" placeholder="Titre de la photo" />
      <textarea v-model="description" placeholder="Description de la photo"></textarea>
      <input type="file" />
      <button type="submit">Soumettre</button>
    </form>
  </div>
  <div class="grille">
    <div class="photo-card" v-for="photo in photos" :key="photo.id">
      <img :src="photo.url" :alt="photo.titre" />
      <h3>{{ photo.titre }}</h3>
      <p>{{ photo.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const titre = ref('');
const description = ref('');
const photos = ref([
  {
    id: 1,
    
    
    description: 'Description de la photo 1'
  }
]);

const ajouterPhoto = () => {
  if (titre.value && description.value) {
    const nouvellePhoto = {
      id: photos.value.length + 1,
      titre: titre.value,
      description: description.value
    };
    photos.value.push(nouvellePhoto);
    titre.value = '';
    description.value = '';
  }
};
</script>