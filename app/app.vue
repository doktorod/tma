<script setup>
import { ClosingConfirmation, useMiniApp } from "vue-tg";
//const { miniApp } = useMiniApp();
//const miniApp = null;
if (import.meta.client) {
  useTgWebAppStore().init();
  //const miniApp = useMiniApp();
  //miniApp.enableClosingConfirmation();
  // miniApp.onEvent("viewportChanged", (event) => {
  //   // Проверяем, если приложение сворачивается
  //   if (!event.isStateStable) {
  //     console.log("Mini App сворачивается или закрывается");
  //     logout();
  //   }
  // });
  //console.log(miniApp);
}
const logout = async () => {
  console.log("CLOSE");

  const result = await $fetch("/api/auth/logout", {
    method: "GET",
  });
};
</script>
<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
      <ClosingConfirmation />
    </NuxtLayout>
  </ClientOnly>
</template>
