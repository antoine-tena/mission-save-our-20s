<template>
  <header>
    <NuxtLink to="/">
      <img src="/logo.png" alt="LogoMissionSaveOur20s" />
    </NuxtLink>
    <div> 
      <button @click="gererClicAlbum">Album photos</button>
      <button @click="gererClicAntoine">antoine le caca</button>
    </div>
  </header>
</template>

<script setup lang="ts">
const gererClicAlbum = (): void => {
  alert("Album photos cliqué !");
};
const gererClicAntoine = (): void => {
  alert("Antoine le gros caca gay s'est pris une fessé !");
};
</script>

<style scoped>
header {
  background-color: #ca75d6ff;
  padding: 20px; 
}

header img {
  width: 150px; 
}

header div {
  margin-top: 10px;
}

button {
  background-color: white;
  color: #c40e75ff;
  border: 1px solid black;
  padding: 5px;
  margin-right: 10px;
}
</style>