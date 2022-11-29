import mongoose from "mongoose";
import SneakerSchema from "./sneakerSchema.js";
var Sneaker = mongoose.model("Sneaker", SneakerSchema);
export default Sneaker;
