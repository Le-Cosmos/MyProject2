import mongoose from 'mongoose';
import UserSchema from "./userSchema.js";

var Player = mongoose.model("User", UserSchema);

export default Player;
