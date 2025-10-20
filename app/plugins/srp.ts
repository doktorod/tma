import * as srp from "secure-remote-password/client";
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      srp,
    },
  };
});
