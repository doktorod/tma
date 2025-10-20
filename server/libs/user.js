import { apiTmaUrl } from "./api";
//import axios from "axios";

const serialize = (obj, prefix) => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
};
const getUser = async (data) => {
  const url = new URL(`${apiTmaUrl}/clients`);
  //const url = `${apiTmaUrl}/clients`;
  const params = new URLSearchParams();
  //params.append("init_data", JSON.parse(data.initData));
  params.append("init_data", data.initData);
  //console.log("INITDATA", JSON.parse(data.initData));
  //console.log("INITDATA", data.initData.slice(1, -1));
  //console.log(data);
  //console.log(JSON.stringify(data.initDataUnsafe));
  // const params = new URLSearchParams(data.initDataUnsafe);
  // url.search = "init_data=" + params;
  //console.log(serialize(data.initDataUnsafe.user));
  console.log(data.initData);
  // try {
  //   const result = await fetch(`${url}?${params}`).then((response) =>
  //     response.json()
  //   );
  //   console.log("result", result);
  //   return result;
  // } catch (err) {
  //   console.log(err);
  // }

  let user = {
    id: 479308417,
    first_name: "Test Customer!",
    last_name: "",
    username: "telegram_user",
    salt: "d3d2d1d79fafb2ed6d20b4007a58d6c99497b923d0e6a6ba2d77ded28313fba8",
    verifier:
      "6d9b1fdd8a839d87bb6a81768e406e3d007b259634241c807725d674b2d3c9a85c9b36cebb89fcc1de9d26be4315b0d3af6c83bc2729ef37de0672e1baa1a0a35c4a38846eb9111d8be4cf04b617f1858280cbe07cc7f1e60ea23151b6c4d866a732ad0913bd392adc9df627faba225e984698b8065920e3c7e8d436782e5bcb64b4555ef903046ab81303dfe7d4c83b211512814531f3c6a90ba9c2609d404327a1d2df37424d1231118c7293d3b39ff83c1a49b3bf87d002183d0a9d960ea8a57057fac6e38f2c2da3952ce02dced8e8f78a0b5941b55512586ec523d3c590423a0eb1c7e550dc7ae7ab574bf79be2d9406a7aebe75c6802262e5d2f49ee2f",
  };
  user.verify = user.verifier && user.salt ? true : false;
  return user;
};

export { getUser };
