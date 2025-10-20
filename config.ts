const configFile = `./config/${process.env.NODE_ENV}.json`;
const defaultConfig = "./config/default.json";

import fs from "fs";
if (process.env.NODE_ENV && fs.existsSync(configFile)) {
  var siteConfig = JSON.parse(fs.readFileSync(configFile, "utf8"));
} else {
  var siteConfig = JSON.parse(fs.readFileSync(defaultConfig, "utf8"));
}

export default siteConfig;
