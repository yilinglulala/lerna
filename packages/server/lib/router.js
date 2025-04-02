const Router = require('koa-router')
let router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'some value..'
})
router.get('/a', (ctx) => {
  ctx.body = 'aaa'
})
router.get('/aa', (ctx) => {
  ctx.body = { data: 3 }
})

module.exports = router
