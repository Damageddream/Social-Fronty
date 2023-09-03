import { CommentDisplayI } from "./commentI";

export interface  PostI {
    title: string;
    text: string;
    author: string;
    timestamp:string;
    likes: string[]
    _id?: number;
}

export interface  PostDisplayI {
    title: string;
    text: string;
    author: string;
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
