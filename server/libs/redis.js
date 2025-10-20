import redis from "redis";
const config = useRuntimeConfig();

const addToRedis = async (key, data, expire) => {
  const redisClient = redis.createClient({
    url: config.redis.url,
  });
  await redisClient.connect();
  await redisClient.set(key, data);
  if (expire) {
    await redisClient.expire(key, expire);
  }

  await redisClient.quit();
};

const getFromRedis = async (key) => {
  const redisClient = redis.createClient({
    url: config.redis.url,
  });
  await redisClient.connect();
  let data = await redisClient.get(key);
  await redisClient.quit();
  return data;
};
const deleteFromRedis = async (key) => {
  const redisClient = redis.createClient({
    url: config.redis.url,
  });
  await redisClient.connect();
  await redisClient.del(key);
  await redisClient.quit();
};

const deleteOldUserSessions = async (userId, fingerprint) => {
  const redisClient = redis.createClient({
    url: config.redis.url,
  });
  await redisClient.connect();
  let res = await redisClient.keys(config.redis.prefix + ":uuid:*");
  if (Array.isArray(res) && res.length) {
    for (let i = 0; i < res.length; i++) {
      let val = await redisClient.get(res[i]);
      let valParse = JSON.parse(val);
      if (
        valParse.userdata.id === userId &&
        valParse.userdata.fingerprint === fingerprint
      ) {
        // console.log("key " + res[i]);
        // console.log("delete from redis(redis)");
        await redisClient.del(res[i]);
      }
    }
  }
  await redisClient.quit();
};

const getUserSessions = async (username) => {
  try {
    const redisClient = redis.createClient({ url: config.redis.url });
    await redisClient.connect();
    let res = await redisClient.keys(config.redis.prefix + ":uuid:*");
    let sessions = [];
    if (Array.isArray(res) && res.length) {
      for (let i = 0; i < res.length; i++) {
        let val = await redisClient.get(res[i]);
        let valParse = JSON.parse(val);
        if (valParse.userdata.username === username) {
          let expire = await redisClient.ttl(res[i]);
          let session = {
            key: res[i],
            expire: expire,
            data: valParse,
          };
          sessions.push(session);
        }
      }
      await redisClient.quit();
      return sessions;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export {
  addToRedis,
  getFromRedis,
  deleteFromRedis,
  deleteOldUserSessions,
  getUserSessions,
};
