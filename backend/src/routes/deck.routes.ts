import express from "express";
import { createDeck, getDecks, deleteDeck, updateDeck } from "../controllers/deck.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create", authMiddleware, createDeck);
router.get("/get-decks", authMiddleware, getDecks);
router.delete("/delete/:deckId", authMiddleware, deleteDeck);
router.put("/update/:deckId", authMiddleware, updateDeck)

export default router;