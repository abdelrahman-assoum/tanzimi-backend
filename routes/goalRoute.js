import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { createGoal, deleteGoal, getGoalById, getGoals, getUserGoals, updateGoal } from "../controllers/goalController.js";
const router = Router();

router.get("/", getGoals);
router.get("/user", getUserGoals);
router.post("/new", createGoal);
router.put("/edit/:id", updateGoal);
router.delete("/delete/:id", deleteGoal);
router.get("/:id", getGoalById);
    
export default router;
