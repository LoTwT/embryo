export default {
  method: "GET",
  handler: async (ctx) => {
    // redis
    // await ctx.redis.set("embryo:user", "lotwt")

    // mysql
    // const sql = `INSERT INTO tbl_users(username,nickname) VALUES('lotwt', 'lo')`
    // ctx.mysql.query(sql, function (error, results, fields) {
    //   if (error) throw error
    //   console.log("results: ", results)
    // })

    // elasticsearch
    // await ctx.elasticsearch.create({
    //   index: "student",
    //   type: "_doc",
    //   id: "1",
    //   body: {
    //     name: "lotwt",
    //     sex: "male",
    //     age: 29,
    //   },
    // })

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
