<script setup>
const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  alertModalMsg: String,
  alertType: {
    type: String,
    required: false,
  },
});
const modelValue = toRef(props, "modelValue");
const alertDialog = ref(false);
const resolveRef = ref(null);
const rejectRef = ref(null);

const emit = defineEmits(["close", "update:modelValue"]);
const close = () => {
  emit("update:modelValue", false);
  emit("close");
};
const onUpdate = (e) => {
  emit("update:modelValue", e);
};
</script>
<template>
  <div class="text-center">
    <v-dialog :model-value="modelValue" width="400" :persistent="persistent">
      <v-card>
        <!-- <v-card-title class="d-flex align-center justify-space-between">
          {{ $t("confirmAction") }}

          <v-btn variant="plain" icon="mdi-close" flat @click="cancel"></v-btn>
        </v-card-title> -->

        <v-card-text class="text-center body-1 font-weight-regular">
          <div v-if="alertType && alertType === 'success'" class="mb-4">
            <v-icon color="success" size="64">mdi-check-circle-outline</v-icon>
          </div>
          <div v-html="alertModalMsg"></div>
        </v-card-text>

        <v-card-actions class="px-4 pb-4 justify-center">
          <v-btn
            elevation="0"
            variant="flat"
            @click="close"
            color="primary"
            width="120px"
            class="btn-40 main-btn"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
