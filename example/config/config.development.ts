export default (app: any) => {
  return {
    // 开发环境配置
    devServer: {
      port: 8888,
    },
    // 路由类型 "file" | "koa-router"
    // router: "file",
    router: "koa-router",
  }
}
