import "@mdi/font/css/materialdesignicons.css";

//import matreshka from "@/assets/icons/matreshka-100.svg"

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const usedTheme = useCookie("theme");
  const uTeme = usedTheme.value || "light";
  const vuetify = createVuetify({
    theme: {
      defaultTheme: uTeme,
      themes: {
        dark: {
          colors: {
            primary: "#1E88E5",
            //secondary: "#3949AB",
            secondary: "#BBDEFB",
            accent: "#7661C2",
            //  secondary: colors.amber.darken3,
            //  info: colors.teal.lighten1,
            warning: "#D4904F",
            error: "#D56B70",
            success: "#37A8A0",
            background: "#18191d",
            surface: "#2a2f33",
          },
        },
        light: {
          dark: false,
          colors: {
            primary: "#1E88E5",
            secondary: "#BBDEFB",
            accent: "#4527A0",
            success: "#35bf71",
            error: "#ed6060",
            info: "#92D8FF",
            warning: "#FFAB00",
            primaryBlue: "#267afb",
            background: "#f5f5f5",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
