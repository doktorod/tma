const setPinCode = async (pin) => {
  if (import.meta.client) {
    const { $srp } = useNuxtApp();
    const store = useTgWebAppStore();
    console.log(store.initDataUnsafe.user);
    console.log(pin);
    try {
      const salt = $srp.generateSalt();
      console.log(salt);
      const newPrivateKey = $srp.derivePrivateKey(
        salt,
        store.initDataUnsafe.user.id,
        pin
      );
      const verifier = $srp.deriveVerifier(newPrivateKey);
      console.log(verifier);
      const result = await $fetch("/api/auth/setpin", {
        method: "POST",
        body: {
          salt,
          verifier,
          initData: store.initDataUnsafe.user,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
};

const verifyPinCode = async (pin) => {
  if (import.meta.client) {
    try {
      const { $srp } = useNuxtApp();
      const store = useTgWebAppStore();
      const clientEphemeral = $srp.generateEphemeral();
      const userAuth = await $fetch("/api/auth/getpublic", {
        method: "POST",
        body: {
          initData: store.initDataUnsafe.user,
          clientPublic: clientEphemeral.public,
        },
      });
      console.log(userAuth);
      if (userAuth.status === 200 && userAuth.salt) {
        const privateKey = $srp.derivePrivateKey(
          userAuth.salt,
          store.initDataUnsafe.user.id,
          pin
        );
        const clientSession = $srp.deriveSession(
          clientEphemeral.secret,
          userAuth.serverPublic,
          userAuth.salt,
          store.initDataUnsafe.user.id,
          privateKey
        );
        const proof = await $fetch("/api/auth/getproof", {
          method: "POST",
          body: {
            uuid: userAuth.uuid,
            username: store.initDataUnsafe.user.id,
            clientProof: clientSession.proof,
          },
        });
        console.log(proof);
        return proof;
      }
    } catch (e) {
      console.log(e.message);
    }
  }
};

export { setPinCode, verifyPinCode };
