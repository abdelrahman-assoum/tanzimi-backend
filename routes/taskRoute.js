import { Router } from "express";
const router = Router();
import { checkAuth } from "../middleware/auth.js";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";

router.get("/", getTasks);
router.post("/new", createTask);
router.put("/edit/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
