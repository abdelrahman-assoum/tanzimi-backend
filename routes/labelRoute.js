import { Router } from "express";
import {
  createLabel,
  deleteLabel,
  getLabels,
  getUserLabel,
  updateLabel,
} from "../controllers/labelController.js";
const router = Router();
import { checkAuth } from "../middleware/auth.js";

router.get("/", checkAuth, getLabels);
router.post("/new", checkAuth, createLabel);
router.put("/edit/:id", checkAuth, updateLabel);
router.delete("/delete/:id", checkAuth, deleteLabel);
router.get("/user", checkAuth, getUserLabel);

export default router;
