import Router from "@koa/router"

const router = new Router()
router.prefix("/user")
router.get("/getinfo", (ctx, next) => {
  ctx.body = "@koa/router user/getinfo"
})

export default router
