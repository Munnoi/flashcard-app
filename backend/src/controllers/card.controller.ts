import { Request, Response } from "express";
import { prisma } from "../prisma";

export async function createCard(req: Request, res: Response) {
  try {
    const { question, answer, deckId } = req.body;

    if (!question || !answer)
      res.status(400).json({ message: "Question and answer are required" });

    const card = await prisma.card.create({
      data: {
        question,
        answer,
        deckId,
      },
    });
    res.status(201).json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCards(req: Request, res: Response) {
  try {
    const deckId = req.params.deckId as string;
    const cards = await prisma.card.findMany({
      where: {
        deckId,
      },
    });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cards" });
  }
}

export async function deleteCard(req: Request, res: Response) {
  try {
    const cardId = req.params.cardId as string;
    const card = await prisma.card.findUnique({
      where: {
        id: cardId,
      },
    });
    if (!card) return res.status(404).json({ message: "Card not found" });
    await prisma.card.delete({
      where: {
        id: cardId,
      },
    });
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateCard(req: Request, res: Response) {
  try {
    const cardId = req.params.cardId as string;
    const { question, answer } = req.body;
    if (!question || !answer)
      return res
        .status(400)
        .json({ message: "Question and answer are required" });

    const card = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        question,
        answer,
      },
    });

    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
