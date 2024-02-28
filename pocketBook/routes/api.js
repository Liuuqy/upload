const express = require("express");
const router = express.Router();

router.post("/register", (req, res, next) => {
  console.log(req.body);
});
// 测试
router.get("/login/:username/:password", (req, res, next) => {});
module.exports = router;
