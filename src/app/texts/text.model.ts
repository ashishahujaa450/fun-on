import { User } from "../auth/user.model";

export interface TextInterface {
  description: string;
  like: number;
  category: string[];
  id?: number;
  date?: Date;
  user?: User;
  comment?: CommentInterface[];
  likeUsersList?: User[];
}

export interface CommentInterface {
  user?: User;
  body: string;
  date?: Date;
}
