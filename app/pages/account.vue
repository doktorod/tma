<script setup>
definePageMeta({
  layout: "wallet",
});
import { useTheme } from "vuetify";
const localePath = useLocalePath();
const router = useRouter();
const vTheme = useTheme();
const theme = computed(() => vTheme.name.value);
const $auth = useAuth();
const { t } = useI18n();
const confirmModalMsg = ref("");
const confirmDialog = ref(null);
const showAlert = ref(false);
const alertMessage = ref("");

const kycVerify = ref(false);
const devicesCount = ref(1);
const goToReferalProgram = () => {
  router.push(localePath("/referal"));
};
const goToTransactionHistory = () => {
  router.push(localePath("/history"));
};
const goToDevices = () => {};
const goToKycVerification = () => {
  alertMessage.value = "перенаправление на ресурс прохождения KYC";
  showAlert.value = true;
};
const goTo = (url) => {
  router.push(localePath(url));
};
const logout = async () => {
  confirmModalMsg.value = t("logout") + "?";
  confirmDialog.value.open().then(async (result) => {
    if (result) {
      await $auth.logout();
    }
  });
};
</script>
<template>
  <div class="wallet__settings_block fill-height mx-4">
    <div class="py-2 text-center" style="width: 100%">
      <h2>{{ $t("account") }}</h2>
    </div>

    <div
      class="main-block clickable mt-2"
      v-ripple.center="{ class: `text-primary` }"
      @click="goToTransactionHistory"
    >
      <div>
        <v-icon color="primary" class="main-block-icon">mdi-history</v-icon>
        {{ $t("transHistory") }}
      </div>
      <div class="text-disabled">
        <v-btn
          icon="mdi-chevron-right"
          flat
          class="text-disabled small-btn"
          size="small"
        ></v-btn>
      </div>
    </div>

    <div>
      <div
        class="main-block clickable mt-2"
        v-ripple.center="{ class: `text-primary` }"
        @click="goToKycVerification"
      >
        <div>
          <v-icon
            :style="[!kycVerify ? { opacity: '0.4' } : '']"
            :color="kycVerify ? 'success' : ''"
            >mdi-check-decagram</v-icon
          >
          {{ $t("kycVerify") }}
        </div>
        <div class="text-disabled" v-if="!kycVerify">
          {{ $t("pass") }}
          <v-btn
            icon="mdi-chevron-right"
            flat
            class="text-disabled small-btn"
            size="small"
          ></v-btn>
        </div>
        <div class="text-disabled" v-else>{{ $t("passed") }}</div>
      </div>
      <div class="mt-6 text-disabled text-uppercase">{{ $t("params") }}</div>
      <div class="main-block combine mt-2">
        <div
          class="d-flex justify-space-between align-center combine_item clickable"
          style="width: 100%"
          v-ripple.center="{ class: `text-primary` }"
          @click="goToReferalProgram"
        >
          <div>
            <v-icon color="primary" class="main-block-icon"
              >mdi-account-multiple</v-icon
            >
            {{ $t("referralProgram") }}
          </div>
          <v-btn
            icon="mdi-chevron-right"
            flat
            class="text-disabled small-btn"
            size="small"
          ></v-btn>
        </div>
        <div
          class="d-flex justify-space-between align-center combine_item"
          style="width: 100%"
          v-ripple.center="{ class: `text-primary` }"
        >
          <div>
            <span v-if="theme === 'light'">
              <v-icon color="primary" class="main-block-icon"
                >mdi-white-balance-sunny</v-icon
              >
              {{ $t("theme") }} ({{ $t("day") }})
            </span>
            <span v-if="theme === 'dark'">
              <v-icon color="primary" class="main-block-icon"
                >mdi-brightness-3</v-icon
              >
              {{ $t("theme") }} ({{ $t("night") }})
            </span>
          </div>
          <theme-switcher
            destination="listItem"
            className="text-disabled"
          ></theme-switcher>
        </div>
        <div
          class="d-flex justify-space-between align-center combine_item"
          style="width: 100%"
        >
          <div>
            <v-icon color="primary" class="main-block-icon"
              >mdi-translate</v-icon
            >
            {{ $t("language") }}
          </div>
          <lang-switcher
            destination="block"
            className="text-disabled"
          ></lang-switcher>
        </div>
        <!-- <div
          class="d-flex justify-space-between align-center combine_item clickable"
          v-ripple.center="{ class: `text-primary` }"
          style="width: 100%"
          @click="goToDevices"
        >
          <div>
            <v-icon color="primary" class="main-block-icon">mdi-devices</v-icon>
            {{ $t("devices") }}
          </div>
          <div class="text-disabled">
            {{ devicesCount }}
            <v-btn
              icon="mdi-chevron-right"
              flat
              class="text-disabled small-btn"
              size="small"
            ></v-btn>
          </div>
        </div> -->
      </div>
      <div class="mt-6 text-disabled text-uppercase">{{ $t("aboutUs") }}</div>
      <div class="main-block combine mt-2">
        <div
          class="d-flex justify-space-between align-center combine_item clickable"
          style="width: 100%"
          v-ripple.center="{ class: `text-primary` }"
          @click="goTo('/matreshka/official')"
        >
          <div>
            <v-icon color="primary" class="main-block-icon">mdi-send</v-icon>
            {{ $t("offAccounts") }}
          </div>
          <v-btn
            icon="mdi-chevron-right"
            flat
            class="text-disabled small-btn"
            size="small"
          ></v-btn>
        </div>
        <div
          class="d-flex justify-space-between align-center combine_item clickable"
          style="width: 100%"
          v-ripple.center="{ class: `text-primary` }"
          @click="goTo('/matreshka/faq')"
        >
          <div>
            <v-icon color="primary" class="main-block-icon"
              >mdi-frequently-asked-questions</v-icon
            >
            FAQ
          </div>
          <v-btn
            icon="mdi-chevron-right"
            flat
            class="text-disabled small-btn"
            size="small"
          ></v-btn>
        </div>
        <div
          class="d-flex justify-space-between align-center combine_item clickable"
          style="width: 100%"
          v-ripple.center="{ class: `text-primary` }"
          @click="goTo('/matreshka/info')"
        >
          <div>
            <v-icon color="primary" class="main-block-icon"
              >mdi-information</v-icon
            >
            {{ $t("info") }}
          </div>
          <v-btn
            icon="mdi-chevron-right"
            flat
            class="text-disabled small-btn"
            size="small"
          ></v-btn>
        </div>
      </div>

      <div
        class="main-block mt-2 clickable"
        v-ripple.center="{ class: `text-primary` }"
        @click="goTo('/matreshka/support')"
      >
        <div>
          <v-icon color="primary" class="main-block-icon">mdi-chat</v-icon>
          {{ $t("techSupport") }}
        </div>
        <div class="text-disabled">
          <v-btn
            icon="mdi-chevron-right"
            flat
            class="text-disabled small-btn"
            size="small"
          ></v-btn>
        </div>
      </div>
      <div
        class="main-block my-4 text-error clickable"
        v-ripple.center="{ class: `text-primary` }"
        @click="logout"
      >
        <div>
          <v-icon color="error" class="main-block-icon"
            >mdi-logout-variant</v-icon
          >
          {{ $t("logout") }}
        </div>
      </div>
    </div>
    <ConfirmDialog ref="confirmDialog" :confirmModalMsg="confirmModalMsg" />
    <ToolsAlert v-model="showAlert" :alertModalMsg="alertMessage" />
  </div>
</template>
