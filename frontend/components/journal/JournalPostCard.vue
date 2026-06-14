<template>
  <article class="post-card glass-card">
    <!-- Card Header -->
    <header class="post-card-header">
      <div class="author-info">
        <div class="avatar-box">
          <Icon name="lucide:user" />
        </div>
        <div class="meta-text">
          <span class="author-name">{{ post.author.username }}</span>
          <span class="post-date">{{ new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</span>
        </div>
      </div>
      <div v-if="post.location" class="location-badge">
        <Icon name="lucide:map-pin" />
        <span>{{ post.location }}</span>
      </div>
    </header>

    <!-- Card Content -->
    <div class="post-card-content">
      <h2 v-if="post.title" class="post-title">{{ post.title }}</h2>
      <p v-if="post.caption" class="post-caption">{{ post.caption }}</p>

      <!-- Attachments Feed Inside Post Card -->
      <div v-if="post.attachments && post.attachments.length > 0" class="post-attachments-grid">
        <div v-for="att in post.attachments" :key="att.id" class="attachment-media-card">
          <!-- Media Display -->
          <div class="media-display-box">
            <img v-if="att.file_type === 'IMAGE'" :src="att.file_url" :alt="att.caption || 'Photo'" class="media-img" />
            <video v-else-if="att.file_type === 'VIDEO'" :src="att.file_url" controls class="media-video"></video>
            <div v-else-if="att.file_type === 'PDF'" class="media-doc pdf">
              <Icon name="lucide:file-text" class="doc-icon" />
              <span class="doc-name">{{ att.file_name }}</span>
              <a :href="att.file_url" target="_blank" download class="btn-download">
                <Icon name="lucide:download" /> Télécharger
              </a>
            </div>
            <div v-else class="media-doc generic">
              <Icon name="lucide:file" class="doc-icon" />
              <span class="doc-name">{{ att.file_name }}</span>
              <a :href="att.file_url" target="_blank" download class="btn-download">
                <Icon name="lucide:download" /> Télécharger
              </a>
            </div>
            
            <!-- Local location overlay badge -->
            <div v-if="att.location" class="local-location-badge">
              <Icon name="lucide:map-pin" />
              <span>{{ att.location }}</span>
            </div>
          </div>

          <!-- Media Metadata Footer -->
          <div v-if="att.caption" class="media-footer">
            <p class="media-caption">{{ att.caption }}</p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{ post: any }>();
</script>