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
    .then((list) => {
      if (list.length === 0) {
        throw `${animalid} Not Found`;
      }
      return list[0];
    });
}

// Create a new animal
function create(animalData: Animal): Promise<Animal> {
  const animal = new AnimalModel(animalData);
  return animal.save();
}

// Update an animal
function update(animalId: String, animalData: Animal): Promise<Animal> {
  return AnimalModel.findOneAndUpdate(
    { animalid: animalId }, // Use animalid instead of _id to match your schema
    animalData,
    { new: true }
  ).then((updated) => {
    if (!updated) throw `Animal ${animalId} not found`;
    return updated;
  });
}

// Delete an animal
function remove(animalId: String): Promise<void> {
  return AnimalModel.findOneAndDelete({ animalid: animalId }).then((deleted) => {
    if (!deleted) throw `Animal ${animalId} not found`;
  });
}


// Make sure to export all functions
export default { index, get, create, update, remove };