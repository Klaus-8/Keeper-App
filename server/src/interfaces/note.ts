import { Document } from "mongoose";

import IUser from "./user.js";

export default interface INote extends Document {
  user: IUser | string;
  noteId: string;
  title: string;
  content: string;
}
