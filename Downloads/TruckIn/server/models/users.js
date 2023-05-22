import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 20,
    },
    location: string,
    picturePath: {
      type: string,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", Userschema);
export default User;
