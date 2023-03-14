const path = require("path");
const fs = require("fs");

/**
 * 获取路径
 * @param {*} name
 * @returns
 */
function getBaseData(name) {
  const dataPath = path.resolve(__dirname, `../data/${name}.js`);
  const dataString = fs.readFileSync(dataPath, {
    encoding: "utf-8",
  });
  return [dataString.split("="), dataPath];
}

/**
 * 新增数据
 * @param {*} name
 * @param {*} data
 */
function addData(name, data) {
  const [dataArr, dataPath] = getBaseData(name);
  const dataBase = eval(dataArr[1]);

  const id = (dataBase[dataBase.length - 1]?.id || 0) + 1;

  // 新增数组
  dataBase.push({ id, ...data });

  const result = dataArr[0] + "=" + JSON.stringify(dataBase);

  try {
    fs.writeFileSync(dataPath, result);
    console.info("新增数据---[", id, "]---成功");
  } catch (error) {
    console.error("新增数据---[", id, "]---失败");
    console.error(error);
  }
}

/**
 * 更新数据
 * @param {*} name
 * @param {*} data
 */
function updateData(name, data) {
  const [dataArr, dataPath] = getBaseData(name);
  const dataBase = eval(dataArr[1]);

  // 更改数据源
  const index = dataBase.findIndex((item) => item.id === data.id);
  dataBase[index] = { ...dataBase[index], ...data };

  const result = dataArr[0] + "=" + JSON.stringify(dataBase);
  try {
    fs.writeFileSync(dataPath, result);
    console.info("更新数据---[", data.id, "]---成功");
  } catch (error) {
    console.error("更新数据---[", data.id, "]---失败");
    console.error(error);
  }
}

/**
 * 删除数据
 * @param {*} name
 * @param {*} data
 */
function deleteData(name, data) {
  const [dataArr, dataPath] = getBaseData(name);
  let dataBase = eval(dataArr[1]);

  // 更改数据源
  dataBase = dataBase.filter((item) => item.id !== data);

  const result = dataArr[0] + "=" + JSON.stringify(dataBase);

  try {
    fs.writeFileSync(dataPath, result);
    console.info("删除数据---[", data, "]---成功");
  } catch (error) {
    console.error("删除数据---[", data, "]---失败");
    console.error(error);
  }
}

/**
 * 增加数据源
 * @param {*} name
 */
function createSourceData(name) {
  const dataPath = path.resolve(__dirname, `../data/${name}.js`);
  const dataString = `export const ${name}Lists = []`;
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, dataString);
      console.info("新增数据源文件---[", dataPath, "]---成功");
    } else {
      console.info("数据源文件---[", dataPath, "]---已经存在");
    }
  } catch (error) {
    console.error("新增数据源文件---[", dataPath, "]---失败");
    console.error(error);
  }
}

/**
 * 获取数据
 * @param {*} name
 * @param {*} data 可选
 */
function getData(name, data) {
  const [dataArr] = getBaseData(name);
  const dataBase = eval(dataArr[1]);
  if (data?.id) return dataBase.find((item) => item.id === data.id);
  return dataBase;
}

/**
 *
 * @param {*} name 数组源
 * @param {*} type 方式 add | updata | delete | create | get
 * @param {*} data 数据
 */
function handleData(name, type, data) {
  switch (type) {
    case "add":
      addData(name, data);
      break;
    case "update":
      updateData(name, data);
      break;
    case "delete":
      deleteData(name, data);
      break;
    case "create":
      createSourceData(name);
      break;
    case "get":
      return getData(name, data);
      break;
  }
}

module.exports = {
  handleData,
};
