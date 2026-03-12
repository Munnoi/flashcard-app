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
