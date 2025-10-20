<script setup>
import { ScanQr, useClipboard } from "vue-tg";
const { t } = useI18n();

const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["close", "update:modelValue"]);
const modelValue = toRef(props, "modelValue");

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
          <div>{{ $t("sell") }}</div>
        </div>
      </v-card-title>
      <v-card-text
        class="fill-height d-flex flex-column justify-center align-center"
      >
        <div class="text-center">Раздел в стадии <br />разработки</div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
