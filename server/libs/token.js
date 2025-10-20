import jwt from "jsonwebtoken";
const config = useRuntimeConfig();
import * as redis from "./redis";

const generateAccessToken = async (payload, userdata) => {
  console.log(payload);
  const token = jwt.sign(payload, config.jwt.accessTokenKey);
  console.log("generate access token");
  await saveAccessToken(payload, token, userdata);
  return token;
};

const saveAccessToken = async (payload, token, userdata) => {
  const redisPrefix = config.redis.prefix + ":uuid:" + payload.uuid;
  //await clearTokens(userdata.username);
  await redis.deleteOldUserSessions(userdata.id, userdata.fingerprint);
  await redis.addToRedis(
    redisPrefix,
    JSON.stringify({ token: token, userdata: userdata })
  );
  //console.log("save  token");
};

const accessTokenVerify = (token) => {
  try {
    const tokenData = jwt.verify(token, config.jwt.accessTokenKey);
    return tokenData;
  } catch (e) {
    return null;
  }
};

const findToken = async (uuid) => {
  const redisPrefix = config.redis.prefix + ":uuid:" + uuid;
  //console.log("prefix from find token", redisPrefix);
  const data = await redis.getFromRedis(redisPrefix);
  return data;
};

export { generateAccessToken, saveAccessToken, accessTokenVerify, findToken };
