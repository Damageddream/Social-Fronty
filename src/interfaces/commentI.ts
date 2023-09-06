import { UserDisplayI } from "./userI";

export interface CommentI {
    text: string;
    post: string;
}

export interface CommentDisplayI {
    text: string;
    author: UserDisplayI;
    timestamp:string;
    likes: string[]
    _id: number;
    post: string;
}