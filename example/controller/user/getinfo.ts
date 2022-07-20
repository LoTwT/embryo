export default {
  method: "GET",
  handler: async (ctx) => {
    ctx.body = `user/getInfo username:${ctx?.user?.username}`
    // try {
    //   throw Error("this is an error")
    // } catch (error) {
    //   await ctx.render("500", { error })
    // }
  },
}
