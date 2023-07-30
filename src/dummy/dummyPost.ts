import { PostI } from "../interfaces/postI";

export const posts: PostI[] = [
  {
    title: "dummypost",
    text: "dummytext",
    timestamp: new Date(),
    author: "author",
    likes: ["2"],
  },
  {
    title: "dummypost2",
    text: "dummytext2",
    timestamp: new Date(),
    author: "author2",
    likes: ["3"],
  }
];
