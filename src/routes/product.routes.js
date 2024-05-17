import { Router } from "express";
import {
  getAllProducts,
  getVinylProducts,
  getLaminateProducts,
  getProductById,
  createNewProduct,
  editProduct,
  deleteProduct,
  getProductByQuery
} from "../controllers/product.controller.js";

const router = Router()

router.get("/", getAllProducts)
router.get("/query", getProductByQuery)
router.get("/vinyl", getVinylProducts)
router.get("/laminate", getLaminateProducts)
router.get("/find/:id", getProductById)
router.post("/new", createNewProduct)
router.put("/find/:id", editProduct)
router.delete("/find/:id", deleteProduct)

export default router
