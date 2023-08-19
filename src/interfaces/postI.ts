export interface  PostI {
    title: string;
    text: string;
    author: string;
    timestamp: Date;
    likes: string[]
    _id?: number;
}

export interface CommentI {
    text: string;
    author: string;
    timestamp: Date;
    likes: string[];
    post: string;
}

export interface PostDataFromApi {
    success: boolean;
    message: string;
    posts: PostI[]
}
