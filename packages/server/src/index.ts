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

app.get("/animals/:animalid", (req: Request, res: Response) => {
  const { animalid } = req.params;

  Animals.get(animalid).then((data) => {
    if (data) res
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data));
    else res 
      .status(404).send();  
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});