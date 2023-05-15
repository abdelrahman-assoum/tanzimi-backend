import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { createGoal, deleteGoal, getGoalById, getGoals, updateGoal } from "../controllers/goalController.js";
const router = Router();

router.get("/", getGoals);
router.get("/:id", getGoalById);
router.post("/new", createGoal);
router.put("/edit/:id", updateGoal);
router.delete("/delete/:id", deleteGoal);
    
export default router;
