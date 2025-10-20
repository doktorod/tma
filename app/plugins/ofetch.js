import { ofetch } from "ofetch";

export default defineNuxtPlugin((_nuxtApp) => {
  const $auth = useAuth();
  const router = useRouter();

  globalThis.$fetch = ofetch.create({
    onRequest({ request, options }) {
      //const token = $auth.$storage.getCookie("_token.local");
      //const token = $auth.$storage.getCookie("theme");
      console.log("ofetch options 1", options);
      const token = useCookie("auth._token.local");
      // if (token.value) {
      //   const token =
      // }
      //console.log($auth.$storage.getCookies());
      console.log("token", token.value);
      console.log("ofetch auth", $auth.loggedIn);
      if ($auth.loggedIn && token.value) {
        options.headers = { Authorization: `${token.value}` };
        //options.headers.set("Authorization", `${token}`);
      }
      console.log("ofetch options 2", options);
    },
    onResponse({ response }) {
      console.log("ofetch plugin", response.status);
      console.log("ofetch response", response);
      if (response.status === 401) {
        $auth.logout();
        return;
      }
    },
  });
});
