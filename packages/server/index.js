const koa = require("koa");
const router = require('./lib/router')

let app = new koa();
app.use(router.routes()); 

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