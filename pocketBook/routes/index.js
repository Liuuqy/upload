var express = require("express");
var router = express.Router();
const apiRouter = require("./api");
const usersRouter = require("./user");

router.use("/", apiRouter);
router.use("/user", usersRouter);
module.exports = router;
