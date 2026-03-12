import express, { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth.routes";
import deckRoutes from "./routes/deck.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/deck", deckRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
