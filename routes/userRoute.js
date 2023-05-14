import { Router } from "express";
const router = Router();
import Upload from "../middleware/upload.js";
import { checkAuth } from "../middleware/auth.js";
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
router.post("/register", Upload.single("picture"), register);
router.get("/:id", checkAuth, getUserById);
router.delete("/:id", checkAuth, deleteUser);
router.put("/:id", checkAuth, Upload.single("picture"), updateUser);

export default router;
