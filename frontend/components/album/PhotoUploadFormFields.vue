<template>
  <div class="mso-form-fields">
    <div class="input-group">
      <input
        :value="titre"
        @input="$emit('update:titre', ($event.target as HTMLInputElement).value)"
        type="text"
        placeholder="Un titre pour l'éternité..."
        maxlength="100"
        required
      />
      <span class="char-count">{{ titre.length }}/100</span>
    </div>

    <textarea
      :value="description"
      @input="$emit('update:description', ($event.target as HTMLInputElement).value)"
      placeholder="Raconte-moi l'histoire derrière cette image (optionnel)..."
      rows="3"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps<{ titre: string; description: string }>();
defineEmits(['update:titre', 'update:description']);
</script>

<style scoped>
input, textarea {
  width: 100%; border: 2px solid #f1f1f1; border-radius: 12px;
  padding: 1rem; font-family: inherit; margin-bottom: 1.5rem; transition: border-color 0.3s;
}
input:focus, textarea:focus { border-color: var(--clr-primary-200); outline: none; }
.input-group { position: relative; }
.char-count { position: absolute; right: 1rem; bottom: 2.2rem; font-size: 0.7rem; color: #ccc; }
</style>
