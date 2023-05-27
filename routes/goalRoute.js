import { Router } from "express";
import { checkAuth } from "../middleware/auth.js";
import { createGoal, deleteGoal, getGoalById, getGoals, getUserGoals, updateGoal } from "../controllers/goalController.js";
const router = Router();

router.get("/", checkAuth, getGoals);
router.post("/new",checkAuth, createGoal);
router.get("/user/:id",checkAuth, getUserGoals);
router.put("/edit/:id",checkAuth, updateGoal);
router.delete("/delete/:id",checkAuth, deleteGoal);
router.get("/:id",checkAuth, getGoalById);
    
export default router;
