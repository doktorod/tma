import * as user from "../libs/user";
import UserDto from "~~/server/dto/userDto";
export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  //console.log("GETUSER body", body);
  try {
    let userdata;
    const loadedUser = await user.getUser({
      initData: body.initData,
      initDataUnsafe: body.initDataUnsafe,
    });
    if (loadedUser) {
      const sendUser = new UserDto(loadedUser);
      userdata = { ...sendUser };
    }

    return {
      status: 200,
      user: userdata,
    };
  } catch (err) {
    return {
      status: 500,
      error: err.message,
    };
  }
});
