<script setup>
const { t } = useI18n();

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");

const agree = () => {
  close();
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
    transition="dialog-bottom-transition"
    fullscreen
    @update:model-value="onUpdate"
  >
    <v-card>
      <v-card-title>
        <div class="main-card-title">
          <div>{{ $t("pubOfferta") }}</div>
        </div>
      </v-card-title>
      <v-card-text
        class="fill-height d-flex flex-column justify-center align-center"
      >
        <div class="text-center">Документ в работе <br />у юристов</div>
      </v-card-text>
      <v-card-actions class="px-4 pb-4">
        <v-btn
          elevation="0"
          variant="flat"
          @click="close"
          width="120px"
          color="secondary"
          class="btn-40 main-btn"
        >
          {{ $t("no") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          elevation="0"
          variant="flat"
          @click="agree"
          color="primary"
          width="120px"
          class="btn-40 main-btn"
        >
          {{ $t("agree") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
