const { fileLoader } = require("ejs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
//配置multer
const uploads = multer({
  dest: "/images",
  fileFilter: (req, file, cb) => {
    // 限制文件类型
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type."));
      return;
    }
    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync("uploads/")) {
        fs.mkdirSync("uploads/");
      }
      // 获取日期
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      commonPath = path.resolve(__dirname, "../public/images");
      commonPath = path.join(commonPath, year.toString());
      if (!fs.existsSync(path.join(commonPath))) {
        console.log("不存在文件夹", commonPath);
        fs.mkdirSync(path.join(commonPath));
      }
      commonPath = path.join(commonPath, month.toString().padStart(2, "0"));
      if (!fs.existsSync(path.join(commonPath))) {
        fs.mkdirSync(path.join(commonPath));
      }
      // 拼接路径
      cb(null, commonPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${file.originalname}`);
    },
  }),
});

router.post("/editInfo", uploads.single("avatar"), (req, res, next) => {
  //如何解析req.body
  console.log(req.headers["content-type"]); //form-data
  console.log("file", req.file);
  // console.log("文件地址", file.path);
  if (req.file) {
    console.log("上传成功");
    res.json({
      url: req.file.path,
      code: 200,
      msg: "上传成功",
    });
  }
});
router.get("/test", (req, res) => {
  //console.log(req);
  res.send("hello world");
});
module.exports = router;
