import * as redis from "../../libs/redis";
const config = useRuntimeConfig();
import { v4 as uuidv4 } from "uuid";
import * as user from "../../libs/user";
import * as jwttoken from "../../libs/token";

export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  //const token = "abc123";
  //console.log(body);
  try {
    let payload = {};
    let userData = {};
    payload.uuid = uuidv4();
    if (body.uuid) {
      const tmpKey = config.redis.prefix + ":auth:" + body.uuid;
      const tmpData = await redis.getFromRedis(tmpKey);
      const savedData = JSON.parse(tmpData);
      const loadedUser = savedData.userdata;

      payload.id = loadedUser.id;
      payload.username = loadedUser.username;
      userData = loadedUser;
    } else {
      const getUser = await user.getUser(body.initData);
      payload.id = getUser.id;
      payload.username = getUser.username;
      userData = getUser;
    }
    userData.fingerprint = body.fingerprint;
    const token = await jwttoken.generateAccessToken(payload, userData);
    return { token };
  } catch (e) {
    console.log(e.message);
  }
});
