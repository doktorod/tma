<script setup>
definePageMeta({
  layout: "wallet",
});
import { useMiniApp } from "vue-tg";
console.log(useMiniApp());
console.log(window.Telegram);

const closeApp = () => {
  useMiniApp().close();
  setTimeout(() => {
    //window.location.href = "https://t.me/DoktorTMA_bot?start=nuxt_miniapp";
    window.location.href = "https://t.me/DoktorTMA_bot?startapp";
  }, 100);
};
</script>
<template>
  <!-- <div class="d-flex align-center justify-center fill-height">
    <v-img src="/images/building-under-construction.jpg"></v-img>
  </div> -->
  <div class="mx-4">
    <h1>Telegram Mini App</h1>
    <p>InitData: {{ useMiniApp.initData }}</p>
    <v-btn @click="closeApp">Закрыть</v-btn>
  </div>
</template>
