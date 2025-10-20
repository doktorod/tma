import fs from "fs";

// process.env.NITRO_SSL_CERT = fs.readFileSync(
//   "./ssl/fullchain.pem"
// );
// process.env.NITRO_SSL_KEY = fs.readFileSync(
//   "./ssl/privkey.pem"
// );
process.env.NITRO_PORT = "3000";
process.env.NITRO_HOST = "127.0.0.1";
await import("./.output/server/index.mjs");
