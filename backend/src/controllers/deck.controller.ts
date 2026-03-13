import { prisma } from "../prisma";
import { Request, Response } from "express";

export async function createDeck(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const userId = (req as any).user.userId;

    if (!name) return res.status(400).json({ message: "Name is required" });

    const deck = await prisma.deck.create({
      data: {
        title: name,
        userId,
      },
    });
    res.status(201).json(deck);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getDecks(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;
    const decks = await prisma.deck.findMany({
      where: {
        userId,
      },
    });
    res.json(decks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch decks" });
  }
}

export async function deleteDeck(req: Request, res: Response) {
  try {
    const deckId = req.params.deckId as string;
    const userId = (req as any).user.userId;
    const deck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });
    if (!deck) return res.status(404).json({ message: "Deck not found" });
    if (deck.userId !== userId)
      return res.status(403).json({ message: "Unauthorized" });
    await prisma.deck.delete({
      where: {
        id: deckId,
      },
    });
    res.json({ message: "Deck deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateDeck(req: Request, res: Response) {
  try {
    const deckId = req.params.deckId as string;
    const { name } = req.body;
    const userId = (req as any).user.userId;

    await prisma.deck.update({
      where: {
        id: deckId,
      },
      data: {
        title: name,
      },
    });
    res.json({ message: "Deck updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
