<script setup>
const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
  titel: String,
  error: String,
  transition: String,
});
const { t } = useI18n();
const emit = defineEmits([
  "close",
  "update:modelValue",
  "setpin",
  "clearerror",
]);
const modelValue = toRef(props, "modelValue");
const pin = ref("");
const errorMessage = ref("");

const field = ref([]);

const close = () => {
  field.value = [];
  errorMessage.value = "";
  pin.value = "";
  emit("update:modelValue", false);
  emit("close");
};
const onUpdate = (e) => {
  emit("update:modelValue", e);
};

const inputPin = (v) => {
  errorMessage.value = "";
  emit("clearerror");
  if (pin.value.length >= 4) {
    return;
  }
  pin.value += v;
  field.value.push(v);
  const idx = field.value.length - 1;
  setTimeout(() => {
    // if (document.getElementById(`fieldId-${idx}`)) {
    //   document.getElementById(`fieldId-${idx}`).innerHTML = "&bull;";
    // }
    // console.log("IDX", idx);

    // if (document.querySelector(`.field-${idx}`)) {
    //   document.querySelector(`.field-${idx}`).innerHTML = "&bull;";
    // }
    field.value[idx] = "&bull;";
  }, 300);

  if (pin.value.length === 4) {
    setTimeout(() => {
      onPinFinish();
    }, 500);
  }
};

const removeLast = () => {
  if (pin.value.length) {
    pin.value = pin.value.slice(0, -1);
    field.value.pop();
  }
};

const onPinFinish = () => {
  emit("setpin", pin.value);
};
const pinCheckResult = (result) => {
  //console.log(result);
  if (result.status === 200) {
    close();
  } else {
    errorMessage.value = result.error;
    pin.value = "";
    field.value = [];
  }
};
const clearPin = () => {
  pin.value = "";
  field.value = [];
};
defineExpose({ pinCheckResult, clearPin });
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    :transition="transition ? transition : 'dialog-bottom-transition'"
    fullscreen
    @update:model-value="onUpdate"
  >
    <v-card>
      <v-card-title>
        <div class="d-flex justify-space-between align-center">
          <div>
            <span v-if="titel">{{ titel }}</span
            ><span v-else>{{ $t("enterPin") }}</span>
          </div>
          <div class="main-card-title">
            <div>
              <div class="clickable d-flex align-center" @click.stop="close">
                <v-icon>mdi-close</v-icon>
              </div>
            </div>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-center align-center fill-height">
          <div class="pin-form">
            <!-- <v-form> -->
            <div
              class="pin-form-input mx-auto d-flex justify-center align-center"
            >
              <div v-for="(i, idx) in field" :key="idx" class="mx-4">
                <div
                  class="pin-visible"
                  :class="`field-${idx}`"
                  v-html="i"
                ></div>
              </div>
            </div>
            <div class="my-2 text-error text-center" v-if="errorMessage">
              {{ errorMessage }}
            </div>
            <div class="my-2 text-error text-center" v-if="error">
              {{ error }}
            </div>
            <div class="mt-6 d-flex justify-space-evenly">
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(1)"
                >1</v-btn
              >
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(2)"
                >2</v-btn
              >
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(3)"
                >3</v-btn
              >
            </div>
            <div class="mt-6 d-flex justify-space-evenly">
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(4)"
                >4</v-btn
              >
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(5)"
                >5</v-btn
              >
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(6)"
                >6</v-btn
              >
            </div>
            <div class="mt-6 d-flex justify-space-evenly">
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(7)"
                >7</v-btn
              >
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(8)"
                >8</v-btn
              >
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(9)"
                >9</v-btn
              >
            </div>
            <div class="mt-6 d-flex justify-space-evenly">
              <v-btn
                flat
                icon="mdi-backspace-outline"
                variant="text"
                width="72"
                height="72"
                class="tool"
                @click="removeLast"
              ></v-btn>
              <v-btn
                flat
                icon
                variant="text"
                border
                width="72"
                height="72"
                class="keyb"
                @click="inputPin(0)"
                >0</v-btn
              >
              <v-btn
                flat
                icon
                variant="text"
                width="72"
                height="72"
                class="tool"
                :disabled="pin.length < 4"
                @click="onPinFinish"
                >OK</v-btn
              >
            </div>
            <!-- </v-form> -->
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<style lang="scss">
.pin-form {
  max-width: 360px;
  width: 100%;
  //padding: 16px;
  //border: 1px solid rgb(var(--v-theme-primary));
  border-radius: 8px;
  &-input {
    max-width: 200px;
    width: 100%;
    height: 50px;
  }
}
.pin-visible {
  font-size: 1.4rem;
}
.v-btn {
  &.keyb > .v-btn__content {
    font-size: 1.6rem !important;
  }
  &.tool > .v-btn__content {
    font-size: 1rem !important;
  }
}
</style>
