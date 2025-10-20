<script setup>
const { $bus } = useNuxtApp();
const { t } = useI18n();
const $auth = useAuth();
const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");
const store = useTgWebAppStore();

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
      <v-card-title class="about-top-block">
        <div class="main-card-title">
          <div class="main-card-title-back">
            <div
              class="clickable d-flex justify-center align-center"
              @click.stop="close"
            >
              <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
            </div>
          </div>
        </div>
      </v-card-title>
      <v-card-text
        class="fill-height d-flex flex-column"
        style="position: relative"
      >
        <div class="about-user-block d-flex align-center">
          <div class="avatar-block">
            <v-icon size="large" color="success">mdi-account</v-icon>
          </div>
          <div class="ml-4">
            <div>{{ $auth.user?.username }}</div>
            <div class="text-disabled">Не верифицирован</div>
          </div>
        </div>
        <div class="mt-8 text-disabled">
          {{ $t("verifyLevels").toUpperCase() }}
        </div>
        <div class="main-block combine mt-2">
          <h3 class="mr-auto">{{ $t("kycVerify") }}</h3>

          <div class="mr-auto">
            <div class="text-disabled">Требуется</div>
            <div class="mt-2">
              Номер телефона &bull; ID документ &bull; Селфи
            </div>
          </div>

          <div class="text-disabled mr-auto mt-4">
            Доступно после прохождения
          </div>
          <div class="mr-auto">
            <v-icon color="success">mdi-check</v-icon> Продажа USDT на карту<br />
            <v-icon color="success">mdi-check</v-icon> Оплата мобильных
            операторов
          </div>
        </div>
        <div class="mt-auto" style="padding-bottom: 4px; width: 100%">
          <TMAMainButton
            color="primary"
            :title="$t('passVefify')"
            size="large"
            @click="goKyc"
          />
          <div class="mt-4 text-center small-desc">
            <v-icon>mdi-shield-check</v-icon> Ваши данные надежно защищены
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<style lang="scss">
.about-top-block {
  height: 180px;
  background-image: url(/images/kyc-verification.jpg);
  background-size: cover;
}
.about-user-block {
  position: absolute;
  left: 16px;
  right: 16px;
  top: -26px;
  z-index: 11111;
  background-color: rgb(var(--v-theme-surface));
  padding: 4px 8px;
  border-radius: 8px;
}
</style>
