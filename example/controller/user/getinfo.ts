export default {
  method: "GET",
  handler: async (ctx) => {
    // await ctx.redis.set("embryo:user", "lotwt")

    ctx.body = `user/getInfo GET username:${ctx?.user?.username}`
    // try {
    //   throw Error("this is an error")
    // } catch (error) {
    //   await ctx.render("500", { error })
    // }
  },
}

// export default {
//   method: "POST",
//   handler: async (ctx) => {
//     console.log(ctx.request.body)
//     ctx.body = `user/getInfo POST`
//   },
// }
