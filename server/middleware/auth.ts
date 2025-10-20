import * as redis from "../libs/redis";
import * as token from "../libs/token";
export default defineEventHandler(async (event) => {
  //event.context.auth = { user: 123 };
  //console.log("event context", event.context);
  let _token = "";
  //console.log("New request: " + getRequestURL(event));
  const path = event.node.req.url;
  //console.log("New path: " + path);
  //console.log("New request query locale: " + getQuery(event));
  const headers = getRequestHeaders(event);
  //console.log("headers", headers);
  //console.log("authorization from auth middleware", headers.authorization);
  if (headers.authorization) {
    _token = headers.authorization.split(" ")[1];
    //console.log("token from auth middleware", _token);
    const tokendata = token.accessTokenVerify(_token);
    const uuid = tokendata.uuid;
    const findFromRedis = await token.findToken(uuid);

    if (findFromRedis) {
      event.context.userdata = JSON.parse(findFromRedis).userdata;
    }
  }

  const doNotCheck = [
    "/api/auth/login",
    "/api/auth/user",
    "/api/auth/getpublic",
    "/api/auth/getproof",
    "/api/auth/setpin",
    "/api/getuser",
  ];
  if (event.node.req.url?.startsWith("/api/auth")) {
    return;
  }
  if (path?.startsWith("/api/")) {
    if (!doNotCheck.includes(path)) {
      if (!_token) {
        setResponseStatus(event, 401, "Unauthorized");
      }
    }
  }
});
