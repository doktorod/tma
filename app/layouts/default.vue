<script setup>
import { useTheme as useTgTheme, useMiniApp, usePopup } from "vue-tg";
import { useTheme as useVuetifyTheme } from "vuetify";
const miniApp = useMiniApp();
const popup = usePopup();
const nuxtApp = useNuxtApp();
const loading = ref(true);
const themeCookie = useCookie("theme", {
  maxAge: 365 * 24 * 60 * 60 * 1000,
});
const vuetifyTheme = useVuetifyTheme();

nuxtApp.hook("page:finish", () => {
  if (!themeCookie.value) {
    try {
      const { colorScheme } = useTgTheme();
      vuetifyTheme.change(colorScheme.value);
      themeCookie.value = colorScheme.value;
    } catch (e) {
      console.log(e);
    }
  }
  loading.value = false;
});
console.log(miniApp);
//miniApp.isClosingConfirmationEnabled = true;
// miniApp.onViewportChanged((event) => {
//   if (!event.isStateStable) {
//     console.log("Mini App сворачивается или закрывается");
//     popup.showConfirm("Вы уверены, что хотите закрыть приложение?", (ok) => {
//       if (ok) {
//         console.log("Пользователь подтвердил закрытие");
//         // Сохраняем данные или выполняем другие действия
//         miniApp.close(); // Закрываем приложение
//       } else {
//         console.log("Закрытие отменено");
//       }
//     });
//   }
// });
// miniApp.onDeactive(async (event) => {
//   await $fetch("/api/auth/logout", {
//     method: "GET",
//   });
// });

watch(miniApp.isActive, async (isActive) => {
  if (!isActive) {
    console.log("Mini App стало неактивным (возможно, закрыто или свернуто)");
    // Выполняем действия, например, сохраняем данные
    const result = await $fetch("/api/auth/logout", {
      method: "GET",
    });
  } else {
    console.log("Mini App снова активно");
  }
});
</script>
<template>
  <v-app>
    <AppLoader v-model="loading" />
    <ClientOnly>
      <v-main>
        <!-- <div class="px-4"> -->
        <slot theme="dark" />
        <!-- </div> -->
      </v-main>
    </ClientOnly>
  </v-app>
</template>
