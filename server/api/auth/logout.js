import * as redis from "../../libs/redis";
import * as token from "../../libs/token";
const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  console.log("LOGOUT");
  let _token = "";
  const headers = getRequestHeaders(event);
  if (headers.authorization) {
    _token = headers.authorization.split(" ")[1];
    const tokendata = token.accessTokenVerify(_token);
    const uuid = tokendata.uuid;
    const findFromRedis = await token.findToken(uuid);
    if (findFromRedis) {
      const userdata = JSON.parse(findFromRedis).userdata;
      await redis.deleteOldUserSessions(userdata.id, userdata.fingerprint);
    }
  }
});
