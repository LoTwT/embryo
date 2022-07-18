import path from "node:path"
import { App } from "../types"

export default async (app: App) => {
  const { middlewares } = app.config

  // 按照 middlewares 数组的循序加载中间件
  for (let m of middlewares) {
    const curMiddleWarePath = path.resolve(
      app.appPath,
      "./middleware",
      `${m}${app.extName}`,
    )
    const curMiddleware = await import(curMiddleWarePath)
    app.use(curMiddleware.default(app))
  }
}
