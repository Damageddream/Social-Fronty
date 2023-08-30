export interface CommentI {
    text: string;
    author: string;
    timestamp: Date;
    likes: string[]
    _id?: number;
    post: string;
}