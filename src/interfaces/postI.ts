import { CommentDisplayI } from "./commentI";
import { UserDisplayI } from "./userI";

export interface  PostI {
    title: string;
    text: string;
    author: UserDisplayI;
    timestamp:string;
    likes: string[]
    _id: number;
    comments: string[];
}

export interface addEditPostI {
    title: string;
    text: string;
    likes: string[];
    comments: string[] | undefined
}

export interface  PostDisplayI {
    title: string;
    text: string;
    author: UserDisplayI;
    timestamp:string;
    likes: string[]
    _id: number;
    comments: CommentDisplayI[];
}

// export interface CommentI {
//     text: string;
//     author: string;
//     timestamp: Date;
//     likes: string[];
//     post: string;
// }

export interface PostDataFromApi {
    success: boolean;
    message: string;
    posts: PostI[]
}
