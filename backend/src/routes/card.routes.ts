import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { createCard, getCards } from '../controllers/card.controller';

const router = express.Router();

router.post("/create", authMiddleware, createCard);
router.get("/get-cards/:deckId", authMiddleware, getCards);

export default router;