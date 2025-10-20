<script setup>
definePageMeta({
  layout: "wallet",
});
const tgStore = useTgWebAppStore();
console.log(tgStore.initData);
</script>
<template>
  <div class="d-flex flex-column fill-height">
    <div>
      <div>
        <BackButton />
      </div>
      <div class="py-2 text-center" style="width: 100%">
        <h2>{{ $t("transHistory") }}</h2>
      </div>
    </div>

    <div class="d-flex justify-center align-center fill-height">
      <div class="text-center">
        Тут будут отображаться все <br />Ваши финансовые операции
      </div>
    </div>
  </div>
</template>
