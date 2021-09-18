import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatar_url: String,
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  socialOnly: { type: Boolean, default: false },
  location: String,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;
