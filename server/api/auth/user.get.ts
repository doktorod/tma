import * as user from "../../libs/user";
import * as redis from "../../libs/redis";
import * as token from "../../libs/token";
import UserDto from "~~/server/dto/userDto";
export default defineEventHandler(async (event) => {
  console.log("GET USER");
  const headers = getRequestHeaders(event);
  if (headers.authorization) {
    const _token = headers.authorization.split(" ")[1];
    if (!_token) {
      return {
        status: 401,
        error: "not authenticated",
      };
    }
    const tokendata = token.accessTokenVerify(_token);
    if (!tokendata) {
      return {
        status: 401,
        error: "not authenticated",
      };
    }
    const uuid = tokendata.uuid;
    const findFromRedis = await token.findToken(uuid);
    if (!findFromRedis) {
      return {
        status: 401,
        error: "not authenticated",
      };
    }
    const dataFromRedis = JSON.parse(findFromRedis);
    const sendUser = new UserDto(dataFromRedis.userdata);
    const userdata: any = { ...sendUser };
    // if (dataFromRedis.userdata.salt && dataFromRedis.userdata.verifier) {
    //   userdata.hasPinCode = true;
    // }
    return {
      user: userdata,
    };
  } else {
    return {
      status: 401,
      error: "not authenticated",
    };
  }
});
