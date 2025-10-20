import * as redis from "../libs/redis";
import * as token from "../libs/token";
export default defineEventHandler(async (event) => {
  // let _token = "";
  // const path = event.node.req.url;
  // const headers = getRequestHeaders(event);
  // if (headers.authorization) {
  //   _token = headers.authorization.split(" ")[1];
  //   const tokendata = token.accessTokenVerify(_token);
  //   const uuid = tokendata.uuid;
  //   const findFromRedis = await token.findToken(uuid);
  //   if (findFromRedis) {
  //     event.context.userdata = JSON.parse(findFromRedis).userdata;
  //   }
  // }
  // const doNotCheck = [
  //   "/api/auth/login",
  //   "/api/auth/user",
  //   "/api/auth/getpublic",
  //   "/api/auth/getproof",
  //   "/api/auth/setpin",
  //   "/api/getuser",
  // ];
  // if (event.node.req.url?.startsWith("/api/auth")) {
  //   return;
  // }
  // if (path?.startsWith("/api/")) {
  //   if (!doNotCheck.includes(path)) {
  //     if (!_token) {
  //       setResponseStatus(event, 401, "Unauthorized");
  //     }
  //   }
  // }
});
