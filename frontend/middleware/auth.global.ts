export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  // Liste des routes publiques qui ne nécessitent pas d'être connecté
  const publicRoutes = ['/login', '/register'];

  // 1. Rediriger vers /login si l'utilisateur n'est pas authentifié et essaie d'accéder à une route privée
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login');
  }

  // 2. Rediriger vers l'accueil si l'utilisateur est déjà authentifié et essaie d'aller sur login/register
  // Note : On ne redirige PAS si on est sur '/' pour éviter la boucle infinie
  const authRoutes = ['/login', '/register'];
  if (isAuthenticated.value && authRoutes.includes(to.path)) {
    return navigateTo('/');
  }
});
