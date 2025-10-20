<script setup>
import { ScanQr, useQrScanner } from "vue-tg";
const { $bus } = useNuxtApp();
const localePath = useLocalePath();
const router = useRouter();
const qrShow = ref(false);
const result = ref("");
const qrScanner = useQrScanner();
//const result =

const qrCodeScannerShow = async () => {
  // const scanResult = await useQrScan();
  // result.value = scanResult;
  $bus.emit("showscanqr");
};
// function handleScanResult(data) {
//   result.value = data;
//   console.log(data);
//   if (data) {
//     qrShow.value = false;
//   }
// }
</script>
<template>
  <v-footer app fixed height="60">
    <div class="d-flex align-center justify-space-between" style="width: 100%">
      <div>
        <nuxt-link to="/wallet" exact
          ><v-icon size="32">mdi-home</v-icon></nuxt-link
        >
      </div>
      <!-- <div>
        <nuxt-link to="/history" exact
          ><v-icon size="32">mdi-history</v-icon></nuxt-link
        >
      </div> -->
      <!-- <div><v-btn variant="flat" icon="mdi-qrcode-scan" size="x-large"></v-btn></div> -->
      <div>
        <nuxt-link @click="qrCodeScannerShow" class="clickable"
          ><v-icon size="48">mdi-qrcode-scan</v-icon></nuxt-link
        >
      </div>
      <!-- <div>
        <nuxt-link to="/browser" exact
          ><v-icon size="32">mdi-earth</v-icon></nuxt-link
        >
      </div> -->
      <div>
        <nuxt-link to="/account" exact
          ><v-icon size="32">mdi-account</v-icon></nuxt-link
        >
      </div>
    </div>
    <!-- <ScanQr v-if="qrShow" @result="handleScanResult" text="Scan code" /> -->
  </v-footer>
</template>
<style lang="scss" scoped>
a {
  color: inherit;
  opacity: 0.65 !important;
}
.router-link-exact-active {
  opacity: 1 !important;
  & > i {
    font-weight: bold;
    color: rgb(var(--v-theme-primary));
  }
}
</style>
