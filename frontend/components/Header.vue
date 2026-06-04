<template>
  <header>
    <NuxtLink to="/">
      <img src="/logo.png" alt="LogoMissionSaveOur20s" />
    </NuxtLink>
    <div> 
    <NuxtLink to="/albumPhoto">
      <button>Album Photo</button>
    </NuxtLink>
      <button @click="gererClicAntoine">antoine le caca</button>
    </div>
  </header>
</template>

<script setup lang="ts">
const gererClicAntoine = (): void => {
  alert("Antoine le gros caca amoureux de amani s'est pris une fessé par bascop puis tabassé par mazingue et bouffé le cul par Yvenat !");
};
</script>

<style scoped>
header {
  background-color: #ca75d6ff; /* Couleur de fond du header */
  padding: 3px 3px; /* Espacement interne du header */
  display: flex; /* Utilisation de Flexbox pour aligner les éléments */
  align-items: center; /* Alignement vertical des éléments */
  justify-content: space-between; /* Espacement entre les éléments (logo à gauche, boutons à droite) */
  }

header img {
  width: 55px; /* Largeur de l'image du logo */
  height: auto; /* Hauteur automatique pour conserver les proportions */
}

header div {
  display: flex; /* Utilisation de Flexbox pour aligner les éléments */
  gap: 12px; /* Espacement entre les boutons */
}

button {
  background-color: white; /* Couleur de fond des boutons */
  color: #c40e75ff; /* Couleur du texte des boutons */
  border: 1px solid black; /* Bordure des boutons */
  padding: 5px; /* Espacement interne des boutons */
  
}
</style>