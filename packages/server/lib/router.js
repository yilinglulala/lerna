const Router = require("koa-router");
let router = new Router();

router.get("/", ctx => {
    ctx.body = "some value..";
})
router.get("/getList", ctx => {
    ctx.body = 'aaa';
})
router.get("/getOvertimeHours", ctx => {
    ctx.body = {data:3};
})

module.exports = router