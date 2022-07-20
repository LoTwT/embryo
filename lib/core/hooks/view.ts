import views from "koa-views"
import path from "node:path"
import { App } from "../types"

const defaultViewConfig = {
  extension: "ejs",
}

export default async (app: App) => {
  const viewConfig = app.config.view
  app.use(
    views(
      path.join(app.appPath, "./view"),
      Object.assign(defaultViewConfig, viewConfig),
    ),
  )
}
