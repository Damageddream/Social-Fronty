import { CommentDisplayI } from "./commentI";
import { UserDisplayI } from "./userI";

export interface  PostI {
    text: string;
    author: UserDisplayI;
    timestamp:string;
    likes: string[]
    _id: number;
    comments: string[];
}

export interface PostPostI {
    text: string;
}

export interface addEditPostI {
    text: string;
    likes: string[];
    comments: string[] | undefined
}

export interface  PostDisplayI {
    text: string;
    author: UserDisplayI;
    timestamp:string;
    likes: string[]
    _id: number;
    comments: CommentDisplayI[];
}

export interface PostDataFromApi {
    success: boolean;
    message: string;
    posts: PostI[]
}
