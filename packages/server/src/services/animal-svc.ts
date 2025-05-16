import { Schema, model } from "mongoose";
import { Animal } from "../models/animal";

const AnimalSchema = new Schema<Animal>(
    {
        animalid: { type: String, required: true },
        imgSrc: { type: String, required: true },
        titleHeader: { type: String, required: true },
        name: { type: String, required: true },
        diet: { type: String, required: true },
        food: { type: String, required: true },
        era: { type: String, required: true },
        life: { type: String, required: true }
    },
    { collection: "animals" }
);

const AnimalModel = model<Animal>("Animal", AnimalSchema);

function index(): Promise<Animal[]> {
    return AnimalModel.find();
}

function get(animalid: String): Promise<Animal> {
  return AnimalModel.find({ animalid })
    .then((list) => list[0])
    .catch((err) => {
      throw `${animalid} Not Found`;
    });
}

export default { index, get };