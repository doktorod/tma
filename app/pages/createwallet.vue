<script setup>
import { verifyPinCode } from "#imports";
import getBrowserFingerprint from "get-browser-fingerprint";
definePageMeta({
  auth: false,
});
const $auth = useAuth();
const { t } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const store = useTgWebAppStore();

const showPinCodeDialog = ref(false);
const addPinCodeDialog = ref(false);
const pinCode = ref("");
const setPinDialog = ref(null);

const goToWallet = async () => {
  userLogin();
};
const setPinCode = () => {
  addPinCodeDialog.value = true;
};
const cancelPinCode = () => {
  addPinCodeDialog.value = false;
};
const pinAdded = async () => {
  console.log("SET PIN");
  userLogin();
};
const userLogin = async (uuid) => {
  try {
    const fingerprint = await getBrowserFingerprint();
    // console.log(store.initDataUnsafe.user);
    // console.log(uuid);
    await $auth.login({
      body: {
        initData: store.initDataUnsafe.user,
        fingerprint,
      },
    });
    if ($auth.loggedIn) {
      router.push(localePath("/wallet"));
    }
    //console.log($auth);
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="d-flex flex-column align-center fill-height px-4">
    <div class="mt-8" style="width: 100%">
      <TMAMainButton
        color="primary"
        :title="$t('setPin')"
        @onClick="setPinCode"
        size="large"
      />
    </div>
    <div class="mt-8" style="width: 100%">
      <TMAMainButton
        color="secondary"
        :title="$t('laterPin')"
        @onClick="goToWallet"
        size="large"
      />
    </div>
    <ToolsComparePinCode
      v-if="addPinCodeDialog"
      @closedialog="cancelPinCode"
      @pinadded="pinAdded"
      ref="setPinDialog"
    />
  </div>
</template>
