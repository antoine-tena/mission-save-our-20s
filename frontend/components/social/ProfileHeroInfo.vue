<template>
  <div class="hero-main-group">
    <div class="avatar-container">
      <img :src="avatarUrl || '/default-avatar.png'" alt="Avatar" class="main-avatar" />
      <button class="avatar-edit-badge" @click="$emit('editAvatar')">
        <Icon name="lucide:camera" />
      </button>
    </div>
    <div class="user-meta-info">
      <div class="name-badge-row">
        <h1 class="user-display-name">{{ username }}</h1>
        <button class="btn-edit-profile" @click="$emit('editProfile')">Modifier profil</button>
      </div>
      <div class="stats-row">
        <div class="stat-item"><strong>{{ postsCount }}</strong> publications</div>
        <div class="stat-item"><strong>{{ points }}</strong> XP Mission</div>
        <div class="stat-item"><strong>{{ friendsCount }}</strong> amis</div>
      </div>
      <div class="bio-summary">
        <p class="status-text"><Icon name="lucide:sparkles" /> {{ status || 'En mission...' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ avatarUrl?: string | null; username?: string; status?: string; friendsCount: number; postsCount: number; points: number; }>();
defineEmits(['editAvatar', 'editProfile']);
</script>

<style scoped>
.hero-main-group { display: flex; align-items: center; gap: 4rem; padding: 2rem 0; }
.avatar-container { position: relative; width: 150px; height: 160px; }
.main-avatar { width: 150px; height: 150px; border-radius: 50%; border: 1px solid #dbdbdb; object-fit: cover; }
.avatar-edit-badge { position: absolute; bottom: 15px; right: 5px; background: white; border: 1px solid #dbdbdb; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.user-meta-info { flex: 1; }
.name-badge-row { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; }
.user-display-name { font-size: 1.8rem; font-weight: 300; color: #262626; }
.btn-edit-profile { background: white; border: 1px solid #dbdbdb; padding: 5px 10px; border-radius: 4px; font-weight: 600; font-size: 0.9rem; cursor: pointer; }
.stats-row { display: flex; gap: 2.5rem; margin-bottom: 1.5rem; }
.stat-item { font-size: 1rem; color: #262626; }
.status-text { font-weight: 600; font-size: 0.95rem; color: #262626; }
@media (max-width: 768px) { .hero-main-group { flex-direction: column; gap: 2rem; align-items: center; text-align: center; } .stats-row { justify-content: center; } .name-badge-row { flex-direction: column; gap: 1rem; } }
</style>
