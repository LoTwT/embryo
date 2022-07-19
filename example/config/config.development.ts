export default (app: any) => {
  return {
    // 开发环境配置
    devServer: {
      port: 8888,
    },
    // 路由类型 "file" | "koa-router"
    router: "file",
    // router: "koa-router",

    // koa-static 中间件配置
    static: {},

    // cors 配置
    cors: {
      origin: "http://127.0.0.1:5500",
      maxAge: 0,
    },

    // 自定义中间件
    // 加载次序，从左到右
    middlewares: ["two", "one"],

    // 登录配置
    login: {
      needLogin: true, // 接口是否需要鉴权
      secret: "my_secret", // JWT 的 secret
      cookieOption: {},
    },
  }
}
