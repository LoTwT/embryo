const deepMerge = require("../../lib/dist/core/utils/tools").deepMerge
const { expect } = require("chai")

describe("工具类函数测试", () => {
  it("检测 deepMerge 方法", async () => {
    const obj1 = { name: "lotwt", age: 24 }
    const obj2 = { name: "lotwt1", age: 25 }

    expect(deepMerge(obj1, obj2)).deep.equal({
      name: "lotwt1",
      age: 25,
    })
  })
})
