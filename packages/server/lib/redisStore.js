const Redis = require("ioredis");
const { randomBytes } = require('crypto');

class RedisStore {
  constructor(config) {
    this.redis = new Redis(config);
    this.redis.on('ready', () => {
      console.log('【YKOA】【redisStore】redis > connect > ready success', config.host, config.port, config.password);
    });
  }

  getID(length) {
    return randomBytes(length).toString('hex');
  }

  async get(sid, ctx) {
    try {
      let data = await this.redis.get(`node:session:${sid}`);
      return JSON.parse(data);
    } catch (e) {
      console.error('【YKOA】【redisStore】【get】', e);
    }
  }

  async set(session, { sid = this.getID(24), maxAge } = {}, ctx) {
    try {
      await this.redis.set(`node:session:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
    } catch (e) {
      console.error('【YKOA】【redisStore】【set】', e);
    }
    return sid;
  }

  async expire(sid, maxAge) {
    try {
      await this.redis.expire(`node:session:${sid}`, maxAge / 1000);
    } catch (e) {
      console.error('【YKOA】【redisStore】【expire】', e);
    }
  }

  async destroy(sid, ctx) {
    try {
      return await this.redis.del(`node:session:${sid}`);
    } catch (e) {
      console.error('【YKOA】【redisStore】【destroy】', e);
    }
  }
}

module.exports = RedisStore;