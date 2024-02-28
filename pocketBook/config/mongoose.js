const config = require("./config");
const mongoose = require("mongoose");
mongoose.connect(config.url, { useNewUrlParser: true }).then(() => {
  console.log("连接数据库成功");
});
