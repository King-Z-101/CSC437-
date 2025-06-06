"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var animal_svc_exports = {};
__export(animal_svc_exports, {
  default: () => animal_svc_default
});
module.exports = __toCommonJS(animal_svc_exports);
var import_mongoose = require("mongoose");
const AnimalSchema = new import_mongoose.Schema(
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
const AnimalModel = (0, import_mongoose.model)("Animal", AnimalSchema);
function index() {
  return AnimalModel.find();
}
function get(animalid) {
  return AnimalModel.find({ animalid }).then((list) => {
    if (list.length === 0) {
      throw `${animalid} Not Found`;
    }
    return list[0];
  });
}
function create(animalData) {
  const animal = new AnimalModel(animalData);
  return animal.save();
}
function update(animalId, animalData) {
  return AnimalModel.findOneAndUpdate(
    { animalid: animalId },
    // Use animalid instead of _id to match your schema
    animalData,
    { new: true }
  ).then((updated) => {
    if (!updated) throw `Animal ${animalId} not found`;
    return updated;
  });
}
function remove(animalId) {
  return AnimalModel.findOneAndDelete({ animalid: animalId }).then((deleted) => {
    if (!deleted) throw `Animal ${animalId} not found`;
  });
}
var animal_svc_default = { index, get, create, update, remove };
