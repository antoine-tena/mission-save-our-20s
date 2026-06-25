<template>
  <div :class="['profile-avatar', `size-${size}`]">
    <img
      v-if="resolvedAvatarUrl"
      :src="resolvedAvatarUrl"
      :alt="altText"
      class="avatar-image"
    >
    <div v-else class="avatar-fallback">
      <span v-if="initial" class="avatar-initial">{{ initial }}</span>
      <Icon v-else name="lucide:user" class="avatar-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  avatarUrl?: string | null;
  username?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>(), {
  avatarUrl: undefined,
  username: undefined,
  size: 'md'
});

const { user } = useAuth();

const resolvedAvatarUrl = computed(() => {
  if (props.avatarUrl !== undefined) {
    return props.avatarUrl;
  }
  return user.value?.avatar_url || null;
});

const resolvedUsername = computed(() => {
  if (props.username) {
    return props.username;
  }
  return user.value?.username || '';
});

const initial = computed(() => {
  if (!resolvedUsername.value) return '';
  return resolvedUsername.value.charAt(0).toUpperCase();
});

const altText = computed(() => {
  return resolvedUsername.value ? `Avatar de ${resolvedUsername.value}` : 'Avatar';
});
</script>

<style scoped>
.profile-avatar {
  border-radius: 50%;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  background: #fff0f9;
  color: #ca75d6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-initial {
  font-weight: 800;
  line-height: 1;
}

.avatar-icon {
  width: 60%;
  height: 60%;
}

/* Size classes */
.size-xs {
  width: 24px;
  height: 24px;
}
.size-xs .avatar-initial {
  font-size: 0.65rem;
}

.size-sm {
  width: 28px;
  height: 28px;
}
.size-sm .avatar-initial {
  font-size: 0.75rem;
}

.size-md {
  width: 40px;
  height: 40px;
}
.size-md .avatar-initial {
  font-size: 1rem;
}

.size-lg {
  width: 48px;
  height: 48px;
}
.size-lg .avatar-initial {
  font-size: 1.25rem;
}

.size-xl {
  width: 150px;
  height: 150px;
}
.size-xl .avatar-initial {
  font-size: 3.5rem;
}
</style>
