<template>
  <article class="scrapbook-card glass-card">
    <div class="tape-effect"></div>
    <div class="avatar-large">A</div>
    <div class="card-content">
      <p class="intro">
        Architecte de la donnée le jour, sauveur de nos 20 ans la nuit. Arrivé d'<strong>Annecy-Chambéry</strong> pour conquérir les sommets (et le coeur d'une parisienne).
      </p>
      <p>
        Ce carnet compile les algorithmes de nos sorties, les stats de nos bowlings et les archives de nos meilleures randos.
      </p>
    </div>
  </article>
</template>

<style scoped>
.scrapbook-card {
  padding: 3rem;
  position: relative;
}

.avatar-large {
  width: 100px;
  height: 100px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.card-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444;
}

.intro { margin-bottom: 1.5rem; }

.tape-effect {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 35px;
  background: rgba(59, 130, 246, 0.2);
  clip-path: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
}
</style>
