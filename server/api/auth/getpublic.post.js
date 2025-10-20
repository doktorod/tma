import * as srp from "secure-remote-password/server.js";
import * as user from "../../libs/user";
import * as redis from "../../libs/redis";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  let bodyData = await readBody(event);
  //console.log(bodyData);
  try {
    const getUser = await user.getUser(bodyData.initData);
    //console.log(getUser);
    //console.log(runtimeConfig);
    if (getUser) {
      const serverEphemeral = srp.generateEphemeral(getUser.verifier);
      const serverSecret = serverEphemeral.secret;
      const clientPublic = bodyData.clientPublic;
      const tmpData = {
        userdata: getUser,
        salt: getUser.salt,
        verifier: getUser.verifier,
        serverSecret: serverEphemeral.secret,
        clientPublic: bodyData.clientPublic,
      };
      const uuid = uuidv4();
      await redis.addToRedis(
        config.redis.prefix + ":auth:" + uuid,
        JSON.stringify(tmpData),
        60
      );
      return {
        status: 200,
        uuid: uuid,
        salt: getUser.salt,
        serverPublic: serverEphemeral.public,
      };
    }
  } catch (e) {
    console.log(e);
  }
});
