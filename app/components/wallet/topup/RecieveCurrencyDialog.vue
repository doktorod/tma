<script setup>
const { $tools } = useNuxtApp();
import QRCode from "@/components/QRCode.vue";
const { t } = useI18n();

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");
const copyAlert = ref(false);
const qrData = ref("my USDT wallet in TRC-20 network!");
const currencryAddress = ref("TW3p5T7vfSPHTaVFbrU1tR8Sds4rFA7nJS");
const close = () => {
  emit("update:modelValue", false);
};
const onUpdate = (e) => {
  emit("update:modelValue", e);
};

watch(modelValue, (nv) => {
  if (nv) {
    console.log("open");
  } else {
    qrData.value = "";
  }
});

const copyAddress = () => {
  if (import.meta.client) {
    var copyText = document.getElementById("address");
    $tools.selectText("address-block");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    if (navigator.clipboard.writeText(copyText.value)) {
      copyAlert.value = true;
      setTimeout(() => {
        copyAlert.value = false;
      }, 2000);
    }
  }
};
const shareAddress = () => {
  window.open(
    `https://t.me/share/text?text=${currencryAddress.value}`,
    "_blank"
  );
};
// const showCurrencyDialog = () => {
//   currencySelectDialogShow.value = true;
// };
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    transition="slide-x-reverse-transition"
    fullscreen
    @update:model-value="onUpdate"
    scrollable
  >
    <!-- <div class="px-4 main-div"> -->
    <v-card>
      <v-card-title>
        <!-- <div class="d-flex justify-space-between align-center"> -->
        <!-- <div>{{ $t("topUp") }}</div> -->
        <!-- <div class="text-right main-card-title">
          <v-btn
            icon="mdi-close"
            variant="plain"
            class="small-btn"
            size="small"
            @click.stop="close"
          ></v-btn>
        </div> -->
        <!--  </div> -->
        <div class="main-card-title">
          <div>
            <div class="clickable d-flex align-center" @click.stop="close">
              <v-icon>mdi-close</v-icon>
            </div>
          </div>
        </div>
      </v-card-title>
      <v-card-text style="padding: 0 16px 16px 16px !important">
        <div class="main-block combine" style="overflow: auto; height: 100%">
          <QRCode :data="qrData" currency="USDT" network="TRX" />

          <div class="mt-2 text-center text-opacity-60">
            Ваш адрес USDT в сети TRC20
          </div>
          <input :value="currencryAddress" id="address" hidden />
          <div class="my-2 text-center" id="address-block">
            {{ currencryAddress }}
          </div>
          <div class="text-opacity-60 text-center">
            Данный адрес предназначен только для переводов в сети TRC20.
            Отправка средств в другие сети приведет к их потере
          </div>
          <div
            class="mt-2 d-flex justify-space-evenly"
            style="position: relative; width: 100%"
          >
            <v-alert
              dense
              type="success"
              v-model="copyAlert"
              class="address-copy-alert"
              closable
              density="compact"
              position="absolute"
              >{{ $t("copied") }}</v-alert
            >
            <v-btn
              variant="plain"
              icon="mdi-content-copy"
              @click="copyAddress"
            ></v-btn>
            <v-btn
              variant="plain"
              icon="mdi-share-variant"
              @click="shareAddress"
            ></v-btn>
          </div>
          <div class="mt-2 d-flex warning-block">
            <div><v-icon color="warning">mdi-information</v-icon></div>
            <div class="ml-2 d-flex align-center">
              Для зачисления на счет минимальная сумма - 5 USDT
            </div>
          </div>
          <div class="mt-2 d-flex warning-block">
            <div><v-icon color="warning">mdi-information</v-icon></div>
            <div class="ml-2 d-flex align-center">
              Фиксированная комиссия - 5 USDT
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <!-- </div> -->
  </v-dialog>
</template>
<style lang="scss">
.main-card {
  // margin-top: 20px;
  // border-top-left-radius: 24px !important ;
  // border-top-right-radius: 24px !important;
  background-color: rgb(var(--v-theme-surface));
}
.address-copy-alert {
  z-index: 1111;
  top: -30px;
  left: 0;
  min-width: 200px;
  & > .v-alert__prepend {
    align-self: center !important;
  }
}
</style>
