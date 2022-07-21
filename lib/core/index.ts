import Koa from "koa"
import path from "path"
import { deepMerge, getHooks } from "./utils"
import { App, Hook } from "./types"

// cors 需要在 router 左侧
const hooks = [
  "log",
  // "elasticsearch",
  // "mysql",
  // "redis",
  "bodyparser",
  "view",
  "static",
  "login",
  "custom-middlewares",
  "cors",
  "router",
  "lift",
]

type Params = {
  appPath: string
}

export default async function Embryo(params: Params) {
  const app: App = new Koa() as App
  const { appPath } = params
  app.appPath = appPath

  // 获取所有的 config
  const env = process.env.NODE_ENV
  const extName = (app.extName = env === "development" ? ".ts" : ".js")
  const baseConfig = await import(
    path.join(appPath, `config/config.base${extName}`)
  )
  const curConfig = await import(
    path.join(appPath, `config/config.${env}${extName}`)
  )

  app.config = deepMerge(baseConfig.default(app), curConfig.default(app))

  // 获取所有 hooks 逻辑
  const allHooks: Hook[] = await getHooks(hooks)
  for (const hook of allHooks) {
    try {
      await hook.default(app)
    } catch (error) {
      ;(process as any).emit("error", error)
    }
  }

  // 兜底错误打印
  app.on("error", (error) => {
    ;(process as any).emit("error", error)
  })
}
