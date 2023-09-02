export interface CommentI {
    text: string;
    post: string;
}

export interface CommentDisplayI {
    text: string;
    author: string;
    timestamp:string;
    likes: string[]
    _id: number;
    post: string;
}