const { handleData } = require("./utils");

// 新增数据源
handleData("users", "create");

// 测试新增
handleData("users", "add", { name: "乔峰", height: 1.78, age: 18 });
handleData("users", "add", { name: "虚竹", height: 1.78, age: 18 });
handleData("users", "add", { name: "段誉", height: 1.78, age: 18 });

// 测试更改
handleData("users", "update", { id: 1, name: "阿紫" });

// 测试删除
handleData("users", "delete", 1);

// 获取数据
console.log(handleData("users", "get"));
console.log(handleData("users", "get", { id: 2 }));
