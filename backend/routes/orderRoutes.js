import express from "express"
import { admin, protect } from "../middleware/authMiddleware.js"
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from "../controllers/orderControllers.js"

const router = express.Router()

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/myorders").get(protect, getMyOrders)

export default router 