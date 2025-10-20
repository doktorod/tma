<script setup>
import { useTheme } from "vuetify";
const vTheme = useTheme();
const theme = computed(() => vTheme.name.value);
const themeCookie = useCookie("theme", {
  maxAge: 365 * 24 * 60 * 60 * 1000,
});

const props = defineProps({
  destination: String,
  mainColor: String,
  className: {
    type: String,
    required: false,
  },
});

function toggleTheme() {
  //vTheme.global.name.value = vTheme.current.value.dark ? "light" : "dark";
  const newTheme = vTheme.current.value.dark ? "light" : "dark";
  vTheme.change(newTheme);
  //themeCookie.value = vTheme.global.name.value;
  themeCookie.value = newTheme;
  // useCookie(newTheme, {
  //   maxAge: 365 * 24 * 60 * 60 * 1000,
  // });
}
const darkMode = computed({
  get() {
    const mode = theme.value === "dark" ? true : false;
    return mode;
  },
  set(nv) {
    return nv;
  },
});
</script>

<template>
  <div v-if="destination === 'listItem'">
    <v-list-item
      @click="toggleTheme"
      class="u-menu-item compact-list theme-switcher-list"
    >
      <template v-slot:prepend>
        <v-icon v-if="theme === 'light'" :class="className ? className : ''"
          >mdi-brightness-3</v-icon
        >
        <v-icon v-if="theme === 'dark'" :class="className ? className : ''"
          >mdi-white-balance-sunny</v-icon
        >
      </template>
      <v-list-item-title>
        <div class="d-flex justify-space-between">
          <!-- <div>{{ $t("theme") }}</div> -->
          <div :class="className ? className : ''">
            {{ theme === "dark" ? $t("day") : $t("night") }}
          </div>
        </div>
      </v-list-item-title>
    </v-list-item>
  </div>
  <div v-if="destination === 'icon'">
    <v-btn
      icon="mdi-brightness-3"
      variant="text"
      :color="mainColor"
      v-if="theme === 'light'"
      @click="toggleTheme"
    ></v-btn>
    <v-btn
      icon="mdi-white-balance-sunny"
      variant="text"
      :color="mainColor"
      v-if="theme === 'dark'"
      @click="toggleTheme"
    ></v-btn>
  </div>
  <div v-if="destination === 'switch'">
    <v-switch
      :model-value="darkMode"
      @change="toggleTheme"
      density="compact"
      color="primary"
      hide-details
    ></v-switch>
  </div>
</template>
<style lang="scss">
.theme-switcher-list {
  &.v-list-item {
    padding-right: 10px;
  }
}
</style>
