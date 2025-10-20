<script setup>
const { locale, locales, setLocaleCookie, setLocale, localeProperties } =
  useI18n();

const props = defineProps({
  destination: String,
  className: {
    type: String,
    required: false,
  },
});
const localePath = useLocalePath();
const currentLang = ref(locale);
let currentName = localeProperties.value.name;

const changeLocale = async (code) => {
  setLocaleCookie(code);
  setLocale(code);
  currentLang.value = code;
  currentName = localeProperties.value.name;
  await navigateTo(localePath(useRoute().path));
};

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>
<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props, isActive }">
      <v-list-item v-bind="props" v-if="destination === 'listItem'">
        <template v-slot:prepend>
          <v-icon>mdi-translate</v-icon>
        </template>
        <div class="d-flex align-center">
          <div class="small-sans">
            {{ $t("interfaceLng") }} ({{ currentName?.toLowerCase() }})
          </div>
          <v-icon
            class="ml-2"
            size="10"
            :icon="isActive ? 'mdi-triangle' : 'mdi-triangle-down'"
          ></v-icon>
        </div>
      </v-list-item>
      <div
        v-bind="props"
        v-if="destination === 'compact'"
        style="cursor: pointer"
      >
        {{ localeProperties.title }}
        <v-icon
          :icon="isActive ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          size="26"
        ></v-icon>
      </div>
      <div
        v-bind="props"
        v-if="destination === 'block'"
        style="cursor: pointer; padding-right: 10px"
        :class="className ? className : ''"
      >
        {{ currentName }}
        <v-icon
          :icon="isActive ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          size="26"
        ></v-icon>
      </div>
    </template>
    <v-list :slim="true" density="compact" style="padding: 0 !important">
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="changeLocale(locale.code)"
      >
        <v-list-item-title>{{ locale.name }}</v-list-item-title>
        <template v-slot:prepend>
          <v-img :src="locale.icon" width="24" class="mr-2"></v-img>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
