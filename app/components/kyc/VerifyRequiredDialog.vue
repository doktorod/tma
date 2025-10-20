<script setup>
const { $bus } = useNuxtApp();
import AboutKycDialog from "./AboutKycDialog.vue";
const { t } = useI18n();

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");
const showAboutKyc = ref(false);
const kycVerify = ref(false);
const goKyc = () => {
  const msg = "перенаправление на ресурс прохождения KYC";
  $bus.emit("showalert", msg);
};
const close = () => {
  emit("update:modelValue", false);
};
const onUpdate = (e) => {
  emit("update:modelValue", e);
};
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    transition="dialog-bottom-transition"
    fullscreen
    @update:model-value="onUpdate"
  >
    <v-card class="kyc-main-card fill-height">
      <v-card-title class="kyc-top-block">
        <!-- <div class="d-flex justify-space-between align-center">
          <div class="ml-auto">
            <v-btn icon="mdi-close" variant="plain" @click.stop="close"></v-btn>
          </div>
        </div> -->
        <div class="main-card-title">
          <div>
            <div
              class="clickable d-flex align-center justify-end"
              @click.stop="close"
            >
              <v-icon>mdi-close</v-icon>
            </div>
          </div>
        </div>
      </v-card-title>
      <v-card-text class="d-flex flex-column">
        <h3>Требуется верификация</h3>
        <div class="mt-4">
          Для того чтобы продолжить, требуется пройти KYC-верификацию личности
        </div>
        <div class="mt-4 main-block">
          <div class="text-disabled">Ваш статус</div>
          <div v-if="!kycVerify">Не верифицирован</div>
          <div v-else>
            Верификация пройдена
            <v-icon color="success">mdi-check-decagram</v-icon>
          </div>
        </div>
        <div class="mt-2 main-block" v-if="!kycVerify">
          <div class="text-disabled">Требуется</div>
          <div>Верификация</div>
        </div>
        <div class="my-4 pa-2 info-block">
          Займет всего несколько минут<br />
          Стандартная процедура (требуется по закону)
        </div>
        <div class="mt-auto" style="padding-bottom: 4px; width: 100%">
          <div>
            <TMAMainButton
              color="primary"
              :title="$t('passVefify')"
              size="large"
              @click="goKyc"
            />
          </div>
          <div class="mt-2">
            <TMAMainButton
              color="secondary"
              :title="$t('aboutKyc')"
              size="large"
              @click="showAboutKyc = true"
            />
          </div>
        </div>
        <AboutKycDialog v-model="showAboutKyc" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<style lang="scss">
.kyc-main-card {
  margin-top: 20px;
  border-top-left-radius: 24px !important ;
  border-top-right-radius: 24px !important;
}
.kyc-top-block {
  height: 240px;
  background-image: url(/images/kyc-verification.jpg);
  background-size: cover;
}
</style>
