import { Router } from "express";
const router = Router();
import { checkAuth } from "../middleware/auth.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  getUserTasks,
  updateTask,
} from "../controllers/taskController.js";

// router.get("/", getTasks);
router.post("/new", checkAuth, createTask);
router.get("/user/:id", checkAuth, getUserTasks);
router.put("/edit/:id", checkAuth, updateTask);
router.delete("/delete/:id", checkAuth, deleteTask);
router.get("/:id", checkAuth, getTaskById);

export default router;
