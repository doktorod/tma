<script setup>
import { ScanQr } from "vue-tg";
import VerifyRequiredDialog from "~/components/kyc/VerifyRequiredDialog.vue";
const { t } = useI18n();

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");
const verifyRequiredDialogShow = ref(false);
const kycVerify = ref(false);
const qrShow = ref(false);
const qrData = ref("");
const close = () => {
  emit("update:modelValue", false);
};
const onUpdate = (e) => {
  emit("update:modelValue", e);
};

watch(modelValue, (nv) => {
  if (nv) {
    console.log("open");
  }
});
const scanQrCode = () => {
  //currencySelectDialogShow.value = true;
};
const qrCodeScannerShow = () => {
  if (kycVerify.value) {
    qrShow.value = true;
  } else {
    verifyRequiredDialogShow.value = true;
  }
};
function handleScanResult(data) {
  qrData.value = data;
  console.log(data);
  if (data) {
    qrShow.value = false;
  }
}
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    transition="dialog-bottom-transition"
    fullscreen
    @update:model-value="onUpdate"
  >
    <v-card class="main-card">
      <v-card-title>
        <div class="d-flex justify-space-between align-center">
          <div>{{ $t("pay") }}</div>
          <div class="text-right">
            <v-btn icon="mdi-close" variant="plain" @click.stop="close"></v-btn>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div
          class="main-block mt-4 clickable"
          v-ripple.center="{ class: `text-primary` }"
          @click.stop="qrCodeScannerShow"
        >
          <div class="d-flex align-center">
            <v-icon color="primary" size="22" class="main-block-icon"
              >mdi-qrcode-scan</v-icon
            >
            <div class="ml-4">
              <div>{{ $t("scanCode") }}</div>
              <div class="currency-subtitle">{{ $t("scanCode") }}</div>
            </div>
          </div>

          <div class="text-disabled">
            <v-btn
              icon="mdi-chevron-right"
              flat
              class="text-disabled small-btn"
              size="small"
              @click.stop="scanQrCode"
            ></v-btn>
          </div>
        </div>
        <ScanQr v-if="qrShow" @result="handleScanResult" text="Scan code" />
        <VerifyRequiredDialog v-model="verifyRequiredDialogShow" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<style lang="scss">
.main-card {
  margin-top: 20px;
  border-top-left-radius: 24px !important ;
  border-top-right-radius: 24px !important;
}
</style>
