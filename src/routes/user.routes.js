import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  getUserByQuery,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/query", getUserByQuery);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;