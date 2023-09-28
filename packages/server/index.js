const koa = require("./lib/xkoa");
const router = require('./lib/router')
const RedisStore = require('./lib/redisStore');

let app = new koa();
app.use(router.routes()); 

const store = new RedisStore({
  host: '127.0.0.1',
  port: 6379,
  // password: process.env.REDIS_PWD || "Apollo@@@@11",
  family: 4,
  db: 0
});

app.sessionStore(store);

app.listen(8888)
console.log("成功监听端口："+"8888");

/**
 * 错误监听
 */
 app.on('error', function(err, ctx) {
  console.error('**************** server error start ****************');
  console.error(err);
  console.error(ctx);
  console.error('\n' + err && err.message);
  console.error('**************** server error end ****************');
});