<script setup>
const { nuxtApp, localePath, $router } = useNuxtApp();
const goBack = () => {
  $router.back();
};
</script>
<template>
  <v-btn
    density="compact"
    elevation="0"
    icon="mdi-arrow-left-bold-circle-outline"
    @click="goBack"
    class="ml-4 mt-4"
  ></v-btn>
</template>
