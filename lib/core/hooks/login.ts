import { sign, decode } from "jsonwebtoken"
import { App } from "../types"

export default async (app: App) => {
  const loginConfig = app.config.login
  const { secret, cookieOption } = loginConfig

  if (loginConfig?.needLogin) {
    // 检测是否已经登录
    const checkLogin = (ctx, next) => {
      // 这里默认检测，用户名存在，则通过检测
      const token = ctx.cookies.get("diudiu_token")
      if (!token) {
        // 如果没有 token ，则需要进行登录操作
        const jwt = login()
        ctx.cookies.set("diudiu_token", jwt, cookieOption)
        ctx.status = 302
        ctx.redirect(ctx.url)
      } else {
        const user = decode(token)
        if (user) {
          ctx.user = user
        }
      }

      return next()
    }

    // 这里对接公司内部 SSO 的 login 策略，此处用 JWT 方式替换
    const login = () => {
      const jwt = sign({ username: "lotwt" }, secret, {
        expiresIn: "1h",
      })
      return jwt
    }

    app.use(checkLogin)
  }
}
