<template>
  <ScrapbookCard>
    <div class="avatar-large">A</div>
    <div class="card-content">
      <p class="intro">
        Originaire de <strong>Paris 11</strong>, libérée du joug de la CPGE au <strong>Lycée Voltaire</strong>, je redécouvre la liberté entre les montagnes d'Annecy.
      </p>
      <p>
        Ce carnet est ma cachette. Mes photos, mes notes, mes victoires au billard (rares mais précieuses).
      </p>
    </div>
  </ScrapbookCard>
</template>

<style scoped>
.avatar-large {
  width: 100px;
  height: 100px;
  background: #ca75d6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(202, 117, 214, 0.3);
}

.card-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444;
}

.intro { margin-bottom: 1.5rem; }
</style>
