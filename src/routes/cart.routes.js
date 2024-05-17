import { Router } from "express";
import {
  addItemsToCart,
  emptyCartAfterOrder,
  getMyCart,
  removeItemsFromCart,
} from "../controllers/cart.controller.js";

const router = Router()

router.get("/", getMyCart)
router.get("/new", emptyCartAfterOrder)
router.post("/add", addItemsToCart)
router.delete("/sub", removeItemsFromCart)

export default router