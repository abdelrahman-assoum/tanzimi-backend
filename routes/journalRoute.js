import { Router } from "express";
import { createJournal, deleteJournal, getJournals, getUserJournals, updateJournal } from "../controllers/journalController.js";
// import { JournalsUpload } from "../middleware/upload.js";
import { checkAuth } from "../middleware/auth.js";
const router = Router();

// router.get('/', checkAuth, getJournals);
router.post("/new", checkAuth,  createJournal);
router.get("/user/:id",checkAuth, getUserJournals);
router.put('/edit/:id', checkAuth, updateJournal)
router.delete('/delete/:id', checkAuth, deleteJournal)

export default router;