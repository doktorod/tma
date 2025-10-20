import { defineStore } from "pinia";
import { useMiniApp, useCloudStorage } from "vue-tg";
export const useTgWebAppStore = defineStore("tgWebAppStore", {
  state: () => ({
    webAppData: null,
    userData: null,
    initDataUnsafe: null,
    initData: null,
  }),
  actions: {
    init() {
      //console.log(useMiniApp());
      this.setWebAppData();
      if (this.webAppData && this.webAppData.version > "6.0") {
        this.setInitData();
        this.setInitDataUnsafe();
      }
    },
    setUserData() {
      const data = useMiniApp();
      //console.log(this.initDataUnsafe);
    },
    setWebAppData() {
      this.webAppData = useMiniApp();
    },
    setInitData() {
      console.log("MINI APP ", useMiniApp());
      useCloudStorage()
        .getItem("initData")
        .then((data, err) => {
          console.log("setInitData ", data);
          if (!data && !err) {
            this.initData = useMiniApp().initData;
            useCloudStorage().setItem("initData", this.initData);
            console.log("no data", this.initData);
          } else {
            this.initData = JSON.parse(data);
            console.log("PIZDETS 1 !!", this.initData);
          }
        });
    },
    setInitDataUnsafe() {
      console.log("MINI APP ", useMiniApp());
      useCloudStorage()
        .getItem("initDataUnsafe")
        .then((data, err) => {
          console.log("setInitDataUnsafe ", data);
          if (!data && !err) {
            this.initDataUnsafe = useMiniApp().initDataUnsafe;
            useCloudStorage().setItem(
              "initDataUnsafe",
              JSON.stringify(this.initDataUnsafe)
            );
            console.log("no data", this.initDataUnsafe);
          } else {
            this.initDataUnsafe = JSON.parse(data);
            console.log("PIZDETS 2!!", this.initDataUnsafe);
          }
        });
    },
    // setInitData() {
    //   useCloudStorage()
    //     .getItem("initDataUnSafe")
    //     .then(async (data, err) => {
    //       console.log("getItem initDataUnsafe", data);
    //       if (!data && !err) {
    //         this.initDataUnsafe = useMiniApp().initDataUnsafe;
    //         //this.initData = useMiniApp().initData;
    //         //this.initDataUnsafe.user.platform = useMiniApp().platform;
    //         useCloudStorage().setItem(
    //           "initDataUnsafe",
    //           JSON.stringify(this.initDataUnsafe)
    //         );
    //         // useCloudStorage().setItem(
    //         //   "initData",
    //         //   JSON.stringify(this.initData)
    //         // );
    //         //useCloudStorage().setItem("initData", this.initData);
    //       } else {
    //         this.initDataUnsafe = JSON.parse(data);
    //         //this.initData = await useCloudStorage().getItem("initData");
    //         //const unsafe = await useCloudStorage().getItem("initDataUnsafe");
    //         console.log(data);
    //         // //this.initDataUnsafe = JSON.parse(unsafe);
    //         //this.initDataUnsafe.user.platform = useMiniApp().platform;
    //       }
    //     });

    //   useCloudStorage()
    //     .getItem("initData")
    //     .then(async (data, err) => {
    //       console.log("getItem initData", data);
    //       if (!data && !err) {
    //         this.initData = useMiniApp().initData;
    //         useCloudStorage().setItem("initData", this.initData);
    //       } else {
    //         //this.initData = await useCloudStorage().getItem("initData");
    //         //this.initData = data;
    //         this.initData = await useCloudStorage().getItem("initData");
    //       }
    //     });
    //   // this.webAppData.requestContact((ok, response) => {
    //   //   console.log(response);
    //   // });
    //   //console.log()
    //   console.log(this.initDataUnsafe);
    //   console.log(this.initData);
    // },
  },
});
