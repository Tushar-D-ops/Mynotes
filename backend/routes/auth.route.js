import express from "express"
import { signin, signout, signup } from "../Controller/user.controller.js"
import { authenticateToken } from "../utilities.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", authenticateToken, signout)

export default router