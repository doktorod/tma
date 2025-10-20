<script setup>
// const { MainButton, useWebAppPopup, useWebApp } = await import("vue-tg");
import { useMiniApp } from "vue-tg";
// const { showAlert } = useWebAppPopup();
// const { initDataUnsafe } = useWebApp();
// import { useTgWebAppStore } from "~/stores/tgWebApp";
// const { setUserData } = useTgWebAppStore();
import { verifyPinCode } from "#imports";
import getBrowserFingerprint from "get-browser-fingerprint";
definePageMeta({
  auth: false,
});
const tgStore = useTgWebAppStore();
const userStore = useUserStore();
const $auth = useAuth();
const { t } = useI18n();

const localePath = useLocalePath();
const router = useRouter();
const tmpUser = ref(null);
const offertaDialogShow = ref(false);
// import {
//   MainButton,
//   usePopup,
//   useMiniApp,
//   useQrScanner,
//   ScanQr,
//   SecondaryButton,
//   useTheme,
// } from "vue-tg";
onMounted(async () => {
  if (import.meta.client) {
    console.log(useNuxtApp());
    console.log(useMiniApp());
    console.log("initDataUnsafe", useMiniApp().initDataUnsafe);
    console.log(window.Telegram);
    console.log("tgStore.initData", tgStore.initData);
    console.log("tgStore.initDataUnsafe", tgStore.initDataUnsafe);
    console.log("tgStore.webAppData.initData", tgStore.webAppData.initData);
    console.log(
      "tgStore.webAppData.initDataUnsafe",
      tgStore.webAppData.initDataUnsafe
    );
    const initData =
      tgStore.initData === "user" ? useMiniApp().initData : tgStore.initData;
    const initDataUnsafe =
      tgStore.initDataUnsafe && tgStore.initDataUnsafe.user
        ? tgStore.initDataUnsafe
        : useMiniApp().initDataUnsafe;
    const res = await userStore.setTmpUser(initData, initDataUnsafe);
    if (res) {
      tmpUser.value = res;
    }
  }
  // const res = await userStore.setTmpUser({
  //   initData: useMiniApp().initDataUnsafe,
  // });
  // const res = await userStore.setTmpUser(tgStore.initData);
});
//import { usePopup, useMiniApp } from "vue-tg/latest";
//const { showAlert } = usePopup();
//const popup = usePopup();
//const { initDataUnsafe } = useMiniApp();
//const qrScanner = useQrScanner();
//const qrShow = ref(false);
const showPinCodeDialog = ref(false);
//const addPinCodeDialog = ref(false);
const pinCode = ref("");
const pinDialog = ref(null);
// const alertModalMsg = ref("");
// const alertDialog = ref(null);
//const result = ref("");
//const theme = useTheme();
// const showScan = async () => {
//   const url = await qrScanner.show({ text: "Scan code" });
//   const ok = await popup.showConfirm(`Open ${url}?`);
//   if (ok) {
//     result.value = url;
//     qrScanner.close();
//   }
// };
// function handleScanResult(data) {
//   result.value = data;
//   if (data) {
//     qrShow.value = false;
//   }
// }
const goToWallet = () => {
  // router.push(localePath("/wallet"));
  //console.log(theme.colorScheme.value);
  if (tmpUser.value.verify) {
    showPinCodeDialog.value = true;
  } else {
    userLogin();
  }
};
const createWallet = () => {
  router.push(localePath("/createwallet"));
};

const userLogin = async (uuid) => {
  try {
    // const response = await $auth.loginWith("local", {
    //   body: store.initDataUnsafe,
    // });
    const fingerprint = await getBrowserFingerprint();
    console.log(tgStore.initDataUnsafe.user);
    console.log(uuid);
    await $auth.login({
      body: {
        initData: tgStore.initDataUnsafe.user,
        uuid: uuid ? uuid : "",
        fingerprint,
      },
    });
    //$auth.$storage.setUniversal("user", $auth.user, true);
    if ($auth.loggedIn) {
      router.push(localePath("/wallet"));
    }
    console.log($auth);
  } catch (err) {
    console.log(err);
  }
};
const checkPinCode = async (v) => {
  pinCode.value = v;
  const result = await verifyPinCode(v);
  //return;
  if (result.status === "OK") {
    pinDialog.value.pinCheckResult({
      status: 200,
    });
    userLogin(result.uuid);
  } else {
    pinDialog.value.pinCheckResult({
      status: 403,
      error: t("wrongPin"),
    });
  }
};
const showOfferta = () => {
  offertaDialogShow.value = true;
};
// const cancelPinCode = () => {
//   addPinCodeDialog.value = false;
// };
// const pinAdded = () => {};
</script>
<template>
  <div class="d-flex flex-column align-center fill-height px-4">
    <div>
      <v-img src="/images/matreshka-100.svg" width="100"></v-img>
    </div>
    <div>
      <h1>Matreshka Pay</h1>
    </div>
    <div class="mt-4">
      Welcome, {{ tgStore.initDataUnsafe?.user?.first_name }}
      {{ tgStore.initDataUnsafe?.user?.last_name }}
    </div>
    <div class="my-4">PIN: 1234</div>
    <div class="mt-8" style="width: 100%" v-if="tmpUser">
      <TMAMainButton
        color="primary"
        :title="$t('gotoWallet')"
        @onClick="goToWallet"
        size="large"
      />
    </div>
    <div class="mt-8" style="width: 100%" v-else>
      <TMAMainButton
        color="secondary"
        :title="$t('createWallet')"
        @onClick="createWallet"
        size="large"
      />
    </div>
    <div
      class="mt-auto pb-6 clickable clickable-link text-primary"
      @click="showOfferta"
    >
      {{ $t("pubOfferta") }}
    </div>
    <ToolsPinCodeDialog
      v-model="showPinCodeDialog"
      @setpin="checkPinCode"
      ref="pinDialog"
    />
    <PublicOffertaDialog v-model="offertaDialogShow" />
  </div>
</template>
