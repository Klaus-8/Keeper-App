import mongoose, { Schema } from "mongoose";

import { IUser } from "../interfaces/index.js";

const UserSchema: Schema = new Schema(
  {
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
    name: { type: "string" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
