// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Animals from "./services/animal-svc";
import animalRoutes from "./routes/animals";
import auth, { authenticateUser } from "./routes/auth";
// ...existing imports...
import fs from "node:fs/promises";
import path from "path";

connect("zoo");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/animals", authenticateUser, animalRoutes);
//app.use("/api/animals", animalRoutes); // this one works without authentication for now
app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});