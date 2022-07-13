import glob from "glob"
import compose from "koa-compose"
import path from "node:path"
import { App } from "../types"

export default async (app: App) => {
  const { router } = app.config
  const filesList = glob.sync(
    path
      .resolve(app.appPath, "./controller", `**/*${app.extName}`)
      .replace(/\\/g, "/"),
  )

  // 如果是文件路由类型
  if (router === "file") {
    // 文件路由映射表
    const routerMap = {}

    for (let item of filesList) {
      // 获取解构方式，导出对象中的 method 属性和 handler 属性
      const controller = await import(item)
      const { method, handler } = controller.default

      // 获取和 actions 目录的相对路径，例如：goods/getInfo.js
      let relative = path.relative(`${app.appPath}/controller/`, item)

      const platform = process.platform
      // windows：goods\getInfo.js => goods/getInfo.js
      platform === "win32" && (relative = relative.replace(/\\/g, "/"))

      // 获取文件后缀 .js
      const extname = path.extname(item)
      // 剔除文件后缀 .js ，并在前面加一个 / ，例如：/goods/getInfo
      const fileRouter = "/" + relative.split(extname)[0]
      // 连接 method ，形成唯一请求，例如：_GET_/goods/getInfo
      const key = "_" + method + "_" + fileRouter
      // 保存在路由表里
      routerMap[key] = handler
    }

    app.use(async (ctx, next) => {
      const { path, method } = ctx
      // 构建和文件路由匹配的形式：_GET_路由
      const key = `_${method}_${path}`

      // 如果匹配到，就执行对应的 handler
      if (routerMap[key]) await routerMap[key](ctx)
      else ctx.body = "no this router"

      return next()
    })
  }
  // koa-router 类型
  else if (router === "koa-router") {
    const routerFiles = glob.sync(
      path
        .resolve(app.appPath, "./routers", `**/*${app.extName}`)
        .replace(/\\/g, "/"),
    )

    const registerRouter = async () => {
      const routers: any[] = []

      for (let file of routerFiles) {
        const router = await import(file)
        routers.push(router.default.routes())
      }

      return compose(routers)
    }

    app.use(await registerRouter())
  }
}
