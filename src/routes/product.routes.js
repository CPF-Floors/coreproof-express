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
router.get("/", getProductByQuery)
router.get("/vinyl", getVinylProducts)
router.get("/laminate", getLaminateProducts)
router.get("/:id", getProductById)
router.post("/new", createNewProduct)
router.put("/:id", editProduct)
router.delete("/:id", deleteProduct)

export default router
