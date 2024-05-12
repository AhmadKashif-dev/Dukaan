import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addOrderItems } from "../controllers/orderControllers.js"

const router = express.Router()

router.route("/").post(protect, addOrderItems)

export default router 