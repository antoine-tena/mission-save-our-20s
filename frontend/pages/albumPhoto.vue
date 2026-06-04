<template>
  <div class="album-page"> <!-- Conteneur principal de la page album photo -->
    <h1>Album Photo</h1>
    
    <form @submit.prevent="ajouter">  <!-- On empêche le rechargement de la page -->
      <input v-model="nouveauTitre" placeholder="Titre" /> <!-- Champs pour le titre de la photo -->
      <input v-model="nouvelleDescription" placeholder="Description" /> <!-- Champs pour la description de la photo -->
      <input type="file" @change="gererFichier" /> <!-- Input pour sélectionner une photo -->
      <button type="submit">Ajouter</button> <!-- Bouton pour ajouter la photo à l'album -->
    </form>

    <div class="grille"> <!-- Conteneur pour la grille de photos -->
      <div v-for="p in photos" :key="p.id" class="photo-card"> <!-- Carte pour chaque photo -->
        <img :src="p.url" width="200" /> <!-- Affichage de la photo -->
        <h3>{{ p.titre }}</h3> <!-- Affichage du titre de la photo -->
        <p>{{ p.description }}</p> <!-- Affichage de la description de la photo -->
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'; // Importation de la fonction ref pour créer des variables réactives

const photos = ref([]); // Tableau réactif pour stocker les photos de l'album
const nouveauTitre = ref(''); // Variable réactive pour stocker le titre de la nouvelle photo
const nouvelleDescription = ref(''); // Variable réactive pour stocker la description de la nouvelle photo
const fichierImg = ref(null); // Variable réactive pour stocker le fichier de la nouvelle photo sélectionnée

const gererFichier = (e) => { // Fonction pour gérer la sélection d'un fichier
  fichierImg.value = e.target.files[0]; // On stocke le fichier sélectionné dans la variable réactive fichierImg
};

const ajouter = () => { // Fonction pour ajouter une nouvelle photo à l'album
  if (fichierImg.value) { // On vérifie qu'un fichier a été sélectionné
    photos.value.push({ // On ajoute un nouvel objet photo au tableau photos
      id: Date.now(), // On utilise la date actuelle comme ID unique pour la photo
      titre: nouveauTitre.value, // On utilise la valeur du champ titre pour le titre de la photo
      description: nouvelleDescription.value, // On utilise la valeur du champ description pour la description de la photo
      url: URL.createObjectURL(fichierImg.value) // On crée une URL temporaire pour afficher la photo sélectionnée
    });
    // On vide le formulaire
    nouveauTitre.value = ''; // On réinitialise la variable nouveauTitre
    nouvelleDescription.value = ''; // On réinitialise la variable nouvelleDescription
    fichierImg.value = null; // On réinitialise la variable fichierImg
  }
};
</script>