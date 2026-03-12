import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded; // (req as any) is a TypeScript hack to attach custom properties.
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}