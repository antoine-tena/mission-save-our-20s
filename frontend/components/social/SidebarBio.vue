<template>
  <aside class="profile-sidebar-left">
    <SocialSidebarBioMission :points="points" />
    <SocialSidebarBioAbout 
      :bio="bio" 
      :is-editing="isEditing" 
      @start-edit="$emit('startEdit')" 
      @save="$emit('saveBio', $event)" 
    />
    <SocialSidebarBioStatus :status="status" @save="$emit('saveStatus', $event)" />
  </aside>
</template>

<script setup lang="ts">
defineProps<{ points: number; bio: string; status: string; isEditing: boolean; }>();
defineEmits(['startEdit', 'saveBio', 'saveStatus']);
</script>
