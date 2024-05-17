import { Router } from "express";
import {
  changeStatusToCompleted,
  changeStatusToInProcess,
  createNewOrder,
  deleteOrder,
  getAllCompletedOrders,
  getAllInProcessOrders,
  getAllOrders,
  getAllPendingOrders,
  getOrdersFromUser,
} from "../controllers/order.controller.js";

const router = Router()

router.get("/", getAllOrders)
router.get("/pending", getAllPendingOrders)
router.get("/in-process", getAllInProcessOrders)
router.get("/completed", getAllCompletedOrders)
router.get("/user/:id", getOrdersFromUser)
router.post("add", createNewOrder)
router.patch("/status/c/:id", changeStatusToCompleted)
router.patch("/status/p/:id", changeStatusToInProcess)
router.delete("/delete/:id", deleteOrder)

export default router