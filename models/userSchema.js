import mongoose from 'mongoose';
import SneakerSchema from "./sneakerSchema.js";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
      fName: String,
      lName: String,
      mail: String,
      password: String,
      fav: SneakerSchema
})

export default UserSchema;
