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
  alert("Antoine le gros caca amoureux de amani s'est pris une fessé par bascop !");
};
</script>

<style scoped>
header {
  background-color: #ca75d6ff;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header img {
  width: 100px; 
  height: auto;
}

header div {
  display: flex;
  gap: 12px;
}

button {
  background-color: white;
  color: #c40e75ff;
  border: 1px solid black;
  padding: 5px;
  
  
  
}
</style>