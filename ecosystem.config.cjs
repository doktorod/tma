module.exports = {
  apps: [
    {
      name: "TMA",
      //script: "./.output/server/index.mjs",
      script: "./server.mjs",
      exec_mode: "fork",
      port: "3001",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        // NITRO_PORT: "3001",
        // NITRO_HOST: "https://127.0.0.1",
      },
    },
  ],
};
