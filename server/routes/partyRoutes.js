import express from "express";
import { getParties, createParty, updateParty, deleteParty } from "../controllers/partyController.js";
const router = express.Router();

router.get("/", getParties);
router.post("/", createParty);
router.put("/:id", updateParty);
router.delete("/:id", deleteParty);

export default router;
