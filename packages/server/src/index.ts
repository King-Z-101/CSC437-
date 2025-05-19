// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Animals from "./services/animal-svc";
import animalRoutes from "./routes/animals";
import auth, { authenticateZookeeper } from "./routes/auth";

connect("zoo");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);


// Protect your animal routes with authentication
app.use("/api/animals", authenticateZookeeper, animalRoutes);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});