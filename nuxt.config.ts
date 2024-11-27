// https://nuxt.com/docs/api/configuration/nuxt-config
import { VueFireDatabaseOptionsAPI, VueFireFirestoreOptionsAPI } from "vuefire";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-03",
  ssr: true,
  devtools: { enabled: false },
  devServer: { port: 4000 },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxthub/core",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Lato: true,
          Roboto: [400, 700],
          "Geist+Mono": [400, 600],
        },
      },
    ],
    "radix-vue/nuxt",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/eslint",
    "nuxt-vuefire",
  ],
  vuefire: {
    auth: {
      enabled: true,
      persistence: ["indexedDBLocal"],
      sessionCookie: true,
    },
    config: {
      apiKey: "AIzaSyB6F9IwqIM4Il4liKBIwm_hJzCd3_ejL_Q",
      authDomain: "visio-5ac64.firebaseapp.com",
      projectId: "visio-5ac64",
      storageBucket: "visio-5ac64.firebasestorage.app",
      messagingSenderId: "328616269180",
      appId: "1:328616269180:web:bac9bc36ce3c33957a40f9",
      measurementId: "G-35LMZ87L3Y",
    },
    modules: [
      // to use the `firestore` option
      VueFireFirestoreOptionsAPI(),
      // to use the `firebase` option
      VueFireDatabaseOptionsAPI(),
    ],
  },
  hub: {
    database: false,
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
    firebase: {
      gen: 2,
    },
  },
  content: {
    // ... options
  },
  // vite: {
  //   resolve: {
  //     alias: {
  //       '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
  //     },
  //   },
  // },
  $development: {
    devtools: { enabled: true },
  },
});
