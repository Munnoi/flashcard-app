import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createCard,
  getCards,
  deleteCard,
  updateCard,
} from "../controllers/card.controller";

const router = express.Router();

router.post("/create", authMiddleware, createCard);
router.get("/get-cards/:deckId", authMiddleware, getCards);
router.delete("/delete/:cardId", authMiddleware, deleteCard);
router.put("/update/:cardId", authMiddleware, updateCard);

export default router;
