import { Document } from "mongoose";

export default interface IUser extends Document {
  email: { type: string; required: true };
  password: string;
  name: string;
}
