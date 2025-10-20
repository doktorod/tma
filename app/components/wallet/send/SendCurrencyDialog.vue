<script setup>
import { ScanQr, useClipboard } from "vue-tg";
const { t } = useI18n();

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");
const qrShow = ref(false);
const clipboard = useClipboard();
const address = ref("");

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
const openScanner = async () => {
  qrShow.value = true;
  // const scanResult = await useQrScan();
  // alert(scanResult);
  //result.value = scanResult;
};
function handleScanResult(data) {
  address.value = data;

  if (data) {
    qrShow.value = false;
  }
  alert(data);
}
const pasteFromClipBoard = async () => {
  const data = await clipboard.readText();
  address.value = data;
  const text = await navigator.clipboard.readText();
  address.value = text;
};

const setAllFunds = () => {
  console.log("ALL FUNDS");
};
const sendCurrency = async () => {};
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    transition="slide-x-reverse-transition"
    fullscreen
    @update:model-value="onUpdate"
  >
    <v-card>
      <v-card-title>
        <div class="main-card-title">
          <div class="main-card-title-back">
            <div
              class="clickable d-flex justify-center align-center"
              @click.stop="close"
            >
              <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
            </div>
          </div>
          <div>{{ $t("send") }}</div>
        </div>
      </v-card-title>
      <v-card-text class="fill-height d-flex flex-column">
        <div>{{ $t("address") }} {{ address }}</div>
        <div class="main-block mt-2">
          <v-text-field
            v-model="address"
            variant="outlined"
            density="compact"
            :label="$t('addressInNet', ['TRC20'])"
            hide-details="auto"
          >
            <template v-slot:append-inner>
              <div class="d-flex align-center">
                <div
                  @click.stop="pasteFromClipBoard"
                  class="clickable mx-2 v-label"
                >
                  {{ $t("paste").toLowerCase() }}
                </div>
                <div @click.stop="openScanner" class="clickable">
                  <v-icon icon="mdi-qrcode-scan" class="v-label" size="22" />
                </div>
              </div>
            </template>
          </v-text-field>
        </div>
        <div class="mt-4">{{ $t("amount") }}</div>
        <div class="main-block mt-2">
          <v-text-field
            v-model="address"
            variant="outlined"
            density="compact"
            :label="$t('amount')"
            hide-details="auto"
          >
            <template v-slot:append-inner>
              <div @click.stop="setAllFunds" class="clickable mx-2 v-label">
                {{ $t("all").toLowerCase() }}
              </div>
            </template>
          </v-text-field>
        </div>

        <div class="mt-2 d-flex warning-block">
          <div><v-icon color="warning">mdi-information</v-icon></div>
          <div class="ml-2 d-flex align-center">
            {{ $t("fixCommission", ["5 USDT"]) }}
          </div>
        </div>

        <div class="mt-4">{{ $t("memo") }}</div>
        <div class="main-block mt-2">
          <v-text-field
            variant="outlined"
            density="compact"
            label="Комментарий или мемо"
            hide-details="auto"
          ></v-text-field>
        </div>
        <div class="currency-subtitle pl-2 pt-2">
          Оставьте поле пустым если получатель не требует его заполнения
        </div>
        <div class="mt-auto" style="padding-bottom: 4px; width: 100%">
          <TMAMainButton
            color="primary"
            :title="$t('continue')"
            @onClick="sendCurrency"
            size="large"
          />
        </div>
        <ScanQr v-if="qrShow" @result="handleScanResult" text="Scan code" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
