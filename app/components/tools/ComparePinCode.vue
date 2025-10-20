<script setup>
import PinCodeDialog from "./PinCodeDialog.vue";
//import { setPinCode } from "~/tools/setPin";
import { setPinCode } from "#imports";
const pinDialogShow = ref(true);
const repeatPinDialogShow = ref(false);
const addPinDialog = ref(null);
const repeatPinDialog = ref(null);
const pin = ref("");
const repeatPin = ref("");
const errorMessage = ref("");
const alertModalMsg = ref("");
const alertDialog = ref(null);
const emit = defineEmits(["closedialog", "pinadded"]);
const addPinCode = (v) => {
  pin.value = v;
  repeatPinDialogShow.value = true;
  console.log("PIN", v);
};
const repeatPinCode = async (v) => {
  console.log("REPEAT PIN", v);
  if (pin.value !== v) {
    errorMessage.value = "Введенные PIN-коды не совпадают";
    repeatPinDialogShow.value = false;
    addPinDialog.value.clearPin();
    repeatPinDialog.value.clearPin();
    return;
  } else {
    await setPinCode(pin.value);
    alertModalMsg.value = "Пин-код установлен!";
    alertDialog.value.open().then(async (result) => {
      cancelAddPin();
      emit("pinadded");
    });
  }
};
const cancelAddPin = () => {
  pin.value = "";
  repeatPin.value = "";
  console.log("CLOSE");
  emit("closedialog");
  repeatPinDialogShow.value = false;
  pinDialogShow.value = false;
};
onMounted(() => {
  console.log("COMPARE PIN");
});
</script>
<template>
  <PinCodeDialog
    v-model="pinDialogShow"
    @setpin="addPinCode"
    @close="cancelAddPin"
    @clearerror="errorMessage = ''"
    ref="addPinDialog"
    :error="errorMessage"
    transition="slide-x-transition"
  />
  <PinCodeDialog
    v-model="repeatPinDialogShow"
    @setpin="repeatPinCode"
    @close="cancelAddPin"
    ref="repeatPinDialog"
    titel="Повторите пин-код"
    transition="slide-x-transition"
  />
  <ToolsAlertDialog
    ref="alertDialog"
    :alertModalMsg="alertModalMsg"
    persistent
  />
</template>
