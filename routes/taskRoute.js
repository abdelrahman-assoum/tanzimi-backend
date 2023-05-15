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

router.get("/", getTasks);
router.get("/user", getUserTasks);
router.post("/new", createTask);
router.put("/edit/:id", updateTask);
router.delete("/delete/:id", deleteTask);
router.get("/:id", getTaskById);

export default router;
