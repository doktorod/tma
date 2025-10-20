<script setup>
const props = defineProps({
  value: Boolean,
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const modelValue = toRef(props, "modelValue");
const onUpdate = (e) => {
  emit("update:modelValue", e);
};
</script>
<template>
  <transition name="fade">
    <div v-if="modelValue" class="loader-wrapper loading-page-rule">
      <span class="loader-el"></span>
    </div>
  </transition>
</template>
<style scoped>
.loader-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1111;
  background-color: rgb(var(--v-theme-background));
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
}
.loader-el {
  width: 32px;
  height: 32px;
  border: 4px solid rgb(var(--v-theme-primary));
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
