import bodyParser from "koa-bodyparser"
import { App } from "../types"

export default (app: App) => {
  const bodyParserConfig = app.config.bodyparser
  app.use(bodyParser(bodyParserConfig))
}
