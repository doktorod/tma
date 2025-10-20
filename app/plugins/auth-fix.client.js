export default defineNuxtPlugin((nuxtApp) => {
  const { $auth } = nuxtApp;
  $auth.$storage.options.stores.cookie.options.maxAge = null;
  // $auth.$storage.setCookie = (key, value, options) => {
  //   const cookieOptions = {
  //     ...options,
  //     maxAge: 3600,
  //   };
  //   const cookieString = `${key}=${encodeURIComponent(value)}; Path=${
  //     cookieOptions.path
  //   }; SameSite=${cookieOptions.sameSite};${
  //     cookieOptions.secure ? " Secure" : ""
  //   }`;
  //   document.cookie = cookieString;
  //   //useCookie(key, { ...cookieOptions, value }).value = value;
  // };
});
