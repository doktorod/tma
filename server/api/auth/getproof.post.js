import * as srp from "secure-remote-password/server.js";
import * as redis from "../../libs/redis";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let body = await readBody(event);
  try {
    const tmpKey = config.redis.prefix + ":auth:" + body.uuid;
    const tmpData = await redis.getFromRedis(tmpKey);
    const savedData = JSON.parse(tmpData);
    //const loadedUser = savedData.userdata;
    const serverSession = srp.deriveSession(
      savedData.serverSecret,
      savedData.clientPublic,
      savedData.salt,
      body.username,
      savedData.verifier,
      body.clientProof
    );
    return {
      status: "OK",
      uuid: body.uuid,
    };
  } catch (e) {
    console.log(e.message);
    return {
      status: "ERROR",
    };
  }
});
