<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  color: {
    type: String,
    required: false,
    default: "primary",
  },
  size: {
    type: String,
    required: false,
    default: "default",
  },
  appendIcon: {
    type: String,
    required: false,
  },
});
const emit = defineEmits(["onClick"]);
const titleRef = toRef(props, "title");
const colorRef = toRef(props, "color");
const sizeRef = toRef(props, "size");
</script>
<template>
  <v-btn
    elevation="0"
    :color="colorRef"
    block
    :size="sizeRef"
    height="52"
    @click="emit('onClick')"
    class="m-btn"
    >{{ titleRef }}
    <v-icon v-if="appendIcon" class="ml-2">{{ appendIcon }}</v-icon></v-btn
  >
</template>
