<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">Inscription</h1>
      <p class="auth-subtitle">Rejoignez l'aventure MSO20s !</p>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input 
            v-model="form.username" 
            type="text" 
            id="username" 
            required 
            placeholder="votre_pseudo"
          />
        </div>

        <div class="form-group">
          <label for="email">Email (optionnel)</label>
          <input 
            v-model="form.email" 
            type="email" 
            id="email" 
            placeholder="votre@email.com"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input 
            v-model="form.password" 
            type="password" 
            id="password" 
            required 
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="auth-error">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading" class="btn-auth">
          <span v-if="loading">Création...</span>
          <span v-else>S'inscrire</span>
        </button>
      </form>

      <p class="auth-footer">
        Déjà un compte ? 
        <NuxtLink to="/login">Se connecter</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { register } = useAuth();
const router = useRouter();

const form = ref({
  username: '',
  email: '',
  password: ''
});
const loading = ref(false);
const error = ref('');

async function handleRegister() {
  loading.value = true;
  error.value = '';
  
  const result = await register(form.value.username, form.value.password, form.value.email);
  
  if (result.success) {
    router.push('/');
  } else {
    error.value = result.error || 'Erreur lors de l\'inscription';
  }
  loading.value = false;
}

definePageMeta({
  layout: 'default'
});
</script>

<style scoped>
/* Utilise les mêmes styles que login.vue */
.auth-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background: var(--clr-neutral-0);
  padding: var(--space-8);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
}

.auth-title {
  font-size: var(--text-2xl);
  text-align: center;
  margin-bottom: var(--space-1);
}

.auth-subtitle {
  text-align: center;
  color: var(--clr-neutral-500);
  margin-bottom: var(--space-8);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
}

.form-group input {
  padding: var(--space-3);
  border: 1.5px solid var(--clr-neutral-200);
  border-radius: var(--radius-lg);
  outline: none;
  transition: border-color var(--transition-fast);
}

.form-group input:focus {
  border-color: var(--clr-primary-500);
}

.btn-auth {
  margin-top: var(--space-4);
  padding: var(--space-3);
  background: var(--clr-neutral-900);
  color: var(--clr-neutral-0);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--fw-bold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.btn-auth:disabled {
  opacity: 0.7;
}

.auth-error {
  color: var(--clr-error);
  font-size: var(--text-sm);
  text-align: center;
}

.auth-footer {
  text-align: center;
  margin-top: var(--space-6);
  font-size: var(--text-sm);
}

.auth-footer a {
  color: var(--clr-primary-500);
  font-weight: var(--fw-bold);
}
</style>
