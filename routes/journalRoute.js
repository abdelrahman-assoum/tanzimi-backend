import { Router } from "express";
import { createJournal, deleteJournal, getJournals, getUserJournals, updateJournal } from "../controllers/journalController.js";
import { JournalsUpload } from "../middleware/upload.js";
import { checkAuth } from "../middleware/auth.js";
const router = Router();

router.get('/', checkAuth, getJournals);
router.get("/user", getUserJournals);
router.post("/new", checkAuth, JournalsUpload.single("picture"), createJournal);
router.put('/edit/:id', checkAuth, JournalsUpload.single('picture'), updateJournal)
router.delete('/delete/:id', checkAuth, deleteJournal)

export default router;