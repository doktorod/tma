<script setup>
import CurrencySelectDialog from "./CurrencySelectDialog.vue";
import FiatDialog from "./FiatDialog.vue";
const { t } = useI18n();

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");
const currencySelectDialogShow = ref(false);
const fiatDialogShow = ref(false);
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
const showCurrencyDialog = () => {
  currencySelectDialogShow.value = true;
};
const showFiatDialog = () => {
  fiatDialogShow.value = true;
};
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
          <div>{{ $t("topUp") }}</div>
          <div class="text-right">
            <v-btn icon="mdi-close" variant="plain" @click.stop="close"></v-btn>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div>
          <div class="mt-2 mb-4 text-disabled text-uppercase">
            Счет в рублях
          </div>

          <div
            class="main-block mt-4 clickable"
            v-ripple.center="{ class: `text-primary` }"
            @click.stop="showFiatDialog"
          >
            <div>
              <span
                class="icon-currency-rub currency-icon"
                style="font-size: 18px"
              >
                <span class="path1"></span><span class="path2"></span
                ><span class="path3"></span><span class="path4"></span
                ><span class="path5"></span><span class="path6"></span>
              </span>
            </div>
            <div class="mr-auto ml-2">{{ $t("topUp") }}</div>
            <div class="text-disabled">
              <v-btn
                icon="mdi-chevron-right"
                flat
                class="text-disabled small-btn"
                size="small"
                @click.stop="showFiatDialog"
              ></v-btn>
            </div>
          </div>
        </div>
        <div>
          <div class="mt-6 mb-4 text-disabled text-uppercase">crypto</div>
          <div>{{ $t("howRecieve") }}</div>
          <div
            class="main-block mt-4 clickable"
            v-ripple.center="{ class: `text-primary` }"
            @click.stop="showCurrencyDialog"
          >
            <div>
              <v-icon color="primary" size="22" class="main-block-icon"
                >mdi-wallet</v-icon
              >
              {{ $t("extWallet") }}
            </div>
            <div class="text-disabled">
              <v-btn
                icon="mdi-chevron-right"
                flat
                class="text-disabled small-btn"
                size="small"
                @click.stop="showCurrencyDialog"
              ></v-btn>
            </div>
          </div>
        </div>
        <CurrencySelectDialog v-model="currencySelectDialogShow" />
        <FiatDialog v-model="fiatDialogShow" />
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
