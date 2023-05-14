import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { createGoal, deleteGoal, getGoalById, getGoals, updateGoal } from "../controllers/goalController.js";
const router = Router();

router.get("/", checkAuth, getGoals);
router.get("/:id", checkAuth, getGoalById);
router.post("/new", checkAuth, createGoal);
router.put("/edit/:id", checkAuth, updateGoal);
router.delete("/delete/:id", checkAuth, deleteGoal);
    
export default router;
