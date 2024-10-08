const express = require("express");
const userRouter = require("./userRouter");
const profileRouter = require("./profileRouter");
const messageRouter = require("./messageRouter");
const errorHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");
const router = express.Router()

router.use("/users", userRouter)

router.use(authentication)

router.use("/profiles", profileRouter)
router.use("/messages", messageRouter)

router.use(errorHandler)

module.exports = router