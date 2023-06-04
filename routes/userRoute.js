import { Router } from "express";
const router = Router();
import { checkAuth } from "../middleware/auth.js";
// import { ImageUpload } from "../middleware/upload.js";
import {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";

router.get("/", checkAuth, getAllUsers);
router.post("/login", login);
router.post("/register", register);
router.get("/:id", checkAuth, getUserById);
router.delete("/:id", checkAuth, deleteUser);
router.put("/:id", checkAuth, updateUser);

export default router;
