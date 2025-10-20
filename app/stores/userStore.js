import { defineStore } from "pinia";
import { useMiniApp } from "vue-tg";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    initDataUnsafe: null,
    tmpUser: null,
  }),
  actions: {
    async setTmpUser(initData, initDataUnsafe) {
      console.log(initData);
      console.log(initDataUnsafe);
      if (initData === "user") {
        initData = useMiniApp().initData;
      }
      //initData = useMiniApp().initDataUnsafe;
      if (!initDataUnsafe.user) {
        initDataUnsafe = useMiniApp().initDataUnsafe;
      }
      const result = await $fetch("/api/getuser", {
        method: "POST",
        body: { initData, initDataUnsafe },
      });
      console.log(result);
      if (result.status === 200 && result.user) {
        this.userData = result.user;
      }
      return this.userData;
    },
  },
});
