<script setup>
import { useTheme as useTgTheme } from "vue-tg";
import { useTheme as useVuetifyTheme } from "vuetify";
const nuxtApp = useNuxtApp();
const { $bus } = useNuxtApp();
const { t } = useI18n();
const loading = ref(true);
const alertMessage = ref("");
//const themeCookie = useCookie("theme");
const vuetifyTheme = useVuetifyTheme();
const themeCookie = useCookie("theme", {
  maxAge: 365 * 24 * 60 * 60 * 1000,
});
const qrData = ref("");
const ShowQrConfirmDialog = ref(null);
const showOverlay = ref(false);
const showAlertDialog = ref(false);
const alertType = ref("");
onMounted(() => {
  $bus.on("showscanqr", showScanQr);
  $bus.on("showalert", showAlert);
});
const showAlert = (text) => {
  alertMessage.value = text;
  showAlertDialog.value = true;
};
const showScanQr = async () => {
  const scanResult = await useQrScan();
  // const scanResult =
  //   "https://qr.nspk.ru/AD100063TR1PHNHV99NQHKK7T6IPHJJ5?type=02&amp;bank=100000000008&amp;sum=2242200&amp;cur=RUB&amp;crc=B0DB";

  const getQrData = await $fetch("/api/qr/data", {
    method: "POST",
    body: { scanResult },
  });
  if (getQrData.status === 200) {
    qrData.value = getQrData.response;
    ShowQrConfirmDialog.value.open().then(async (result) => {
      if (result) {
        showOverlay.value = true;
        setTimeout(() => {
          showOverlay.value = false;
          alertMessage.value = t("paymentMadeSucces");
          showAlertDialog.value = true;
          alertType.value = "success";
        }, 3000);
        // alertMessage.value = t("paymentMadeSucces");
        // showAlertDialog.value = true;
        // alertType.value = "success";
      }
    });
  }
};
nuxtApp.hook("page:finish", () => {
  if (!themeCookie.value) {
    try {
      const { colorScheme } = useTgTheme();
      vuetifyTheme.global.name.value = colorScheme.value;
      themeCookie.value = colorScheme.value;
    } catch (e) {
      console.log(e);
    }
  }
  loading.value = false;
});
onBeforeUnmount(() => {
  $bus.off("showscanqr");
});
</script>
<template>
  <v-app>
    <AppLoader v-model="loading" />
    <ClientOnly>
      <!-- <NavBar /> -->
      <v-main style="height: 100%">
        <slot />
        <v-overlay
          v-model="showOverlay"
          :close-on-back="false"
          :close-on-content-click="false"
          persistent
          opacity="0.7"
          class="d-flex align-center justify-center"
        >
          <div>обработка платежа</div>
          <div class="text-center mt-4">
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-overlay>
      </v-main>
      <MainFooter />
      <QrConfirmDialog ref="ShowQrConfirmDialog" :qrData="qrData" />
      <ToolsAlert
        v-model="showAlertDialog"
        :alertModalMsg="alertMessage"
        :alertType="alertType"
      />
    </ClientOnly>
  </v-app>
</template>
