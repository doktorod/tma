<script setup>
import RecieveCurrecyDialog from "./RecieveCurrencyDialog.vue";
const { t } = useI18n();

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");

const currencies = ref([]);
const currency = ref(null);
const networks = ref([]);
const network = ref(null);
const recieveCurrencyDialog = ref(false);

const close = () => {
  emit("update:modelValue", false);
};
const onUpdate = (e) => {
  emit("update:modelValue", e);
};

const getCurriencies = async () => {
  const result = await $fetch("/api/currencies", {
    method: "GET",
  });
  console.log(result);
  if (result.length) {
    currencies.value = result;
    const obj = result.find((o) => o.currency === "USDT");
    if (obj) {
      currency.value = obj;
    }
  }
};

const getNetworks = async () => {
  const result = await $fetch("/api/networks", {
    method: "GET",
  });
  console.log(result);
  if (result.length) {
    networks.value = result;
    const obj = result.find((o) => o.name === "TRC-20");
    if (obj) {
      network.value = obj;
    }
  }
};

const goToRecieveCurrency = () => {
  recieveCurrencyDialog.value = true;
};

onMounted(async () => {
  console.log("MOUNTED");
  await getCurriencies();
  await getNetworks();
});

watch(modelValue, (nv) => {
  if (nv) {
    console.log("open");
  }
});
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
          <div>{{ $t("topUp") }}</div>
          <!-- <div class="text-right">
            <v-btn icon="mdi-close" variant="plain" @click.stop="close"></v-btn>
          </div> -->
        </div>
      </v-card-title>
      <v-card-text class="fill-height d-flex flex-column">
        <div>{{ $t("selectCrypto") }}</div>
        <div class="main-block mt-2">
          <v-select
            :items="currencies"
            v-model="currency"
            item-title="currency"
            item-value="currency"
            variant="outlined"
            density="compact"
            :label="$t('select')"
            hide-details
            class="no-border currency-selected"
            return-object
          >
            <template v-slot:selection="{ item }">
              <div class="d-flex align-center">
                <!-- <div style="width: 32px"> -->
                <span
                  :class="`icon-currency-${item.raw.currency.toLowerCase()}`"
                  style="font-size: 30px"
                >
                  <span class="path1"></span><span class="path2"></span
                  ><span class="path3"></span><span class="path4"></span
                  ><span class="path5"></span><span class="path6"></span>
                </span>
                <!-- </div> -->
                <div class="ml-2">
                  <div>{{ item.raw.currency }}</div>
                  <div class="currency-subtitle">
                    {{ item.raw.balance }} {{ item.raw.currency }}
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:item="{ props: itemProps, item }">
              <v-list-item
                v-bind="itemProps"
                :subtitle="`${item.raw.balance} ${item.raw.currency}`"
              >
                <template v-slot:prepend>
                  <div class="mr-2" style="width: 32px">
                    <span
                      :class="`icon-currency-${item.raw.currency.toLowerCase()}`"
                      style="font-size: 30px"
                    >
                      <span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span><span class="path4"></span
                      ><span class="path5"></span><span class="path6"></span>
                    </span>
                  </div>
                </template>
              </v-list-item>
            </template>
          </v-select>
        </div>
        <div class="mt-6">{{ $t("selectNetwork") }}</div>
        <v-radio-group v-model="network">
          <div
            class="main-block mt-2"
            v-for="(net, idx) in networks"
            :key="idx"
          >
            <span
              :class="`icon-currency-${net.currency.toLowerCase()}`"
              style="font-size: 30px; width: 32px"
            >
              <span class="path1"></span><span class="path2"></span
              ><span class="path3"></span><span class="path4"></span
              ><span class="path5"></span><span class="path6"></span>
            </span>
            <div class="ml-2 mr-auto">
              <div>{{ net.currency }}</div>
              <div class="currency-subtitle">{{ net.commission }} USDT</div>
            </div>
            <div>
              <v-radio :value="net" color="primary"></v-radio>
            </div>
          </div>
        </v-radio-group>
        <div class="mt-auto" style="padding-bottom: 4px; width: 100%">
          <TMAMainButton
            color="primary"
            :title="$t('continue')"
            @onClick="goToRecieveCurrency"
            size="large"
          />
        </div>
      </v-card-text>
      <RecieveCurrecyDialog v-model="recieveCurrencyDialog" />
    </v-card>
  </v-dialog>
</template>
<style lang="scss">
// .main-card {
//   margin-top: 20px;
//   border-top-left-radius: 24px !important ;
//   border-top-right-radius: 24px !important;
// }
</style>
