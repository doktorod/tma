<script setup>
const showPinCodeDialog = ref(false);
const addPinCodeDialog = ref(false);
const pinCode = ref("");
const setPinDialog = ref(null);
const setPinCode = () => {
  addPinCodeDialog.value = true;
};
const cancelPinCode = () => {
  addPinCodeDialog.value = false;
};
const pinAdded = async () => {
  console.log("SET PIN");
};
</script>
<template>
  <div class="d-flex flex-column fill-height">
    <div>
      <div>
        <BackButton />
      </div>
      <div class="py-2 text-center" style="width: 100%">
        <h2>{{ $t("security") }}</h2>
      </div>
    </div>

    <div class="fill-height mx-4">
      <div
        class="main-block clickable mt-2"
        v-ripple.center="{ class: `text-primary` }"
        @click="setPinCode"
      >
        <div>
          <v-icon color="primary" class="main-block-icon"
            >mdi-account-cog</v-icon
          >
          {{ $t("setPin") }}
        </div>
        <div class="text-disabled">
          <v-btn
            icon="mdi-chevron-right"
            flat
            class="text-disabled small-btn"
            size="small"
          ></v-btn>
        </div>
      </div>
    </div>
    <ToolsComparePinCode
      v-if="addPinCodeDialog"
      @closedialog="cancelPinCode"
      @pinadded="pinAdded"
      ref="setPinDialog"
    />
  </div>
</template>
