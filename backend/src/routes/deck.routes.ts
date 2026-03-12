import express from "express";
import { createDeck, getDecks } from "../controllers/deck.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create", authMiddleware, createDeck);
router.get("/get-decks", authMiddleware, getDecks);

export default router;