<template>
  <div ref="qrCode" style="position: relative">
    <div class="img-over d-flex justify-center align-center">
      <div style="width: 40px; height: 40px; position: relative">
        <span
          :class="`icon-currency-${currency.toLowerCase()}`"
          style="font-size: 32px"
        >
          <span class="path1"></span><span class="path2"></span
          ><span class="path3"></span><span class="path4"></span
          ><span class="path5"></span><span class="path6"></span>
        </span>
        <div
          style="
            width: 18px;
            height: 18px;
            position: absolute;
            right: 0;
            bottom: 0;
          "
        >
          <span
            :class="`icon-currency-${network.toLowerCase()}`"
            style="font-size: 16px"
          >
            <span class="path1"></span><span class="path2"></span
            ><span class="path3"></span><span class="path4"></span
            ><span class="path5"></span><span class="path6"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//import type QRCodeStyling from 'qr-code-styling';
//const { ref, watch, onMounted, defineProps, useNuxtApp } = useNuxtApp();

const props = defineProps({
  data: String,
  currency: String,
  network: String,
});

const { $qrCodeStyling } = useNuxtApp();
const qrCode = ref(null);

// Default options
const options = {
  width: 240,
  height: 240,
  type: "svg",
  data: props.data,
  image: "/images/empty.gif",
  dotsOptions: {
    color: "#000",
    type: "rounded",
  },
  backgroundOptions: {
    color: "#fff",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10,
  },
};

const qrCodeStyling = $qrCodeStyling(options);

onMounted(() => {
  // Append QR code to DOM element
  qrCodeStyling.append(qrCode.value);
  // Add viewbox to make it resizable
  if (qrCode.value.firstChild)
    qrCode.value.firstChild.setAttribute("viewBox", "0 0 240 240");
});

watch(
  () => props.data,
  (newValue) => {
    console.log("watcher", newValue);
    // Update QR code data when props change
    options.data = newValue;
    qrCodeStyling.update(options);
    // Add viewbox to make it resizable
    if (qrCode.value.firstChild)
      qrCode.value.firstChild.setAttribute("viewBox", "0 0 240 240");
  }
);
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
.img-over {
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 111111;
}
</style>
