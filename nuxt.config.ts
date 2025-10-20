// https://nuxt.com/docs/api/configuration/nuxt-config

// ngrok http --url=fleet-ladybird-pro.ngrok-free.app 3000

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import config from "./config";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    ...config,
  },
  routeRules: {
    "/api/auth/**": {
      ssr: true,
      headers: { "Access-Control-Allow-Methods": "GET, POST, OPTIONS" },
    },
  },
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
      link: [{ rel: "stylesheet", type: "text/css", href: "/css/start.css" }],
      script: [
        {
          defer: true,
          src: "https://telegram.org/js/telegram-web-app.js",
        },
        { defer: true, src: "/js/start.js" },
      ],
    },
  },
  css: [
    "~/assets/scss/_style.scss",
    "~/assets/css/fonts.css",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/currencies.css",
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt-alt/auth",
    "@nuxtjs/i18n",
    "@pinia/nuxt",

    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    server: {
      allowedHosts: true,
    },
    ssr: {
      noExternal: ["vuetify"],
    },
  },

  // serverMiddleware: ['~/server/middleware/logCookies'],

  i18n: {
    skipSettingLocaleOnNavigate: true,
    defaultLocale: "ru",
    //detectBrowserLanguage: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: "ru",
    },
    //silentTranslationWarn: true,
    locales: [
      {
        name: "Русский",
        title: "Ru",
        code: "ru",
        language: "ru-RU",
        file: { path: "ru.ts", cache: false },
        icon: "/images/ru.svg",
      },
      {
        name: "English",
        title: "En",
        code: "en",
        language: "en-US",
        file: { path: "en.ts", cache: false },
        icon: "/images/en.svg",
      },
    ],
    //lazy: false,
    //langDir: "lang",
    baseUrl: process.env.baseUrl,
    // bundle: {
    //   optimizeTranslationDirective: false,
    // },
    // compilation: {
    //   strictMessage: false,
    // },
  },

  http: {
    baseURL: `https://tma.workzone.dev`,
  },

  auth: {
    globalMiddleware: true,
    redirect: {
      login: (auth) => auth.ctx.$localePath("/"),
      logout: (auth) => auth.ctx.$localePath("/"),
      callback: (auth) => auth.ctx.$localePath("/"),
      home: (auth) => auth.ctx.$localePath("/wallet"),
    },
    stores: {
      cookie: {
        enabled: true,
        prefix: "auth.",
        options: {
          path: "/",
          sameSite: "lax",
          //secure: true,
          httpOnly: false,
        },
      },
      // session: { enabled: false },
      // local: { enabled: false },
    },
    strategies: {
      local: {
        token: {
          property: "token",
          required: true,
          global: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
            credentials: "same-origin",
          },
          logout: { url: "/api/auth/logout", method: "post" },
          user: {
            url: "/api/auth/user",
            method: "GET",
            credentials: "same-origin",
          },
        },
      },
    },
    tokenValidationInterval: true,
  },
  features: {
    inlineStyles: false,
  },
});
