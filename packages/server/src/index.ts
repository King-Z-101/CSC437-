// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Animals from "./services/animal-svc";
import animalRoutes from "./routes/animals";

connect("zoo");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/animals", animalRoutes);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});