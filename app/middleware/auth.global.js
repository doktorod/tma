export default defineNuxtRouteMiddleware((to, from) => {
  const $auth = useAuth();
  console.log("loggedIn", $auth.loggedIn);

  //   if (!auth.isAuthenticated) {
  //     return navigateTo("/login");
  //   }
});
