import express, { Request, Response } from "express";
import Animals from "../services/animal-svc";

const router = express.Router();

// GET all animals
router.get("/", (_, res: Response) => {
  Animals.index()
    .then((animals) => res.json(animals))
    .catch((err) => res.status(500).send(err));
});

// GET one animal by ID
router.get("/:animalid", (req: Request, res: Response) => {
  const { animalid } = req.params;
  
  Animals.get(animalid)
    .then((animal) => res.json(animal))
    .catch((err) => res.status(404).send(err));
});

// POST (create) a new animal
router.post("/", (req: Request, res: Response) => {
  const newAnimal = req.body;
  
  Animals.create(newAnimal)
    .then((animal) => res.status(201).json(animal))
    .catch((err) => res.status(500).send(err));
});

// PUT (update) an animal
router.put("/:animalid", (req: Request, res: Response) => {
  const { animalid } = req.params;
  const updatedAnimal = req.body;
  
  Animals.update(animalid, updatedAnimal)
    .then((animal) => res.json(animal))
    .catch((err) => res.status(404).send(err));
});

// DELETE an animal
router.delete("/:animalid", (req: Request, res: Response) => {
  const { animalid } = req.params;
  
  Animals.remove(animalid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;