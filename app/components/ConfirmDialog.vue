<script setup>
const props = defineProps({
  confirmModalMsg: String,
});
const confirmDialog = ref(false);
const resolveRef = ref(null);
const rejectRef = ref(null);

const open = (options) => {
  confirmDialog.value = true;
  //this.options = Object.assign(this.options, options);
  return new Promise((resolve, reject) => {
    resolveRef.value = resolve;
    rejectRef.value = reject;
  });
};
const agree = async (v) => {
  resolveRef.value(true);
  confirmDialog.value = false;
};
const cancel = () => {
  resolveRef.value(false);
  confirmDialog.value = false;
};
defineExpose({
  open,
});
</script>
<template>
  <div class="text-center">
    <v-dialog v-model="confirmDialog" width="400">
      <v-card>
        <!-- <v-card-title class="d-flex align-center justify-space-between">
          {{ $t("confirmAction") }}

          <v-btn variant="plain" icon="mdi-close" flat @click="cancel"></v-btn>
        </v-card-title> -->

        <v-card-text
          class="text-center body-1 font-weight-regular"
          v-html="confirmModalMsg"
        >
        </v-card-text>

        <v-card-actions class="px-4 pb-4">
          <v-btn
            elevation="0"
            variant="flat"
            @click="agree"
            color="primary"
            width="120px"
            class="btn-40 main-btn"
          >
            {{ $t("yes") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            elevation="0"
            variant="flat"
            @click="cancel"
            width="120px"
            color="secondary"
            class="btn-40 main-btn"
          >
            {{ $t("no") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
