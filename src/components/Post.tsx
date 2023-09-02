import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../utilities/URLs";
import { PostDisplayI } from "../interfaces/postI";
import AddComment from "./AddComment";
import useCheckUser from "../customHooks/useCheckUser";
import { CommentDisplayI } from "../interfaces/commentI";

const Post: React.FC = () => {
useCheckUser()
const paramId = useParams()
const [post, setPost] = useState<PostDisplayI>()
const [comments, setComments] = useState<CommentDisplayI[]>()

const getPost = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(serverUrl+`/posts/${paramId.id as string}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token as string}`,
        }
    })
    const data = (await response.json()) as PostDisplayI
    setPost(data)
}

useEffect(()=>{
    getPost().catch(() => {
        console.error("Failed to fetch post");
      });
},[])

const getComments = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(serverUrl + `/posts/${paramId.id as string}/comments`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token as string}`,
        }
    })
    const data = (await response.json()) as CommentDisplayI[]
    setComments(data)
}


    return (
        <>
        <div className="post">
            {post && <div>{post.title}{post.author}{post.text}
            <><AddComment postID={post._id.toString()} /></></div>}
            {!post && <div>There is no post with that id</div>}
        </div>
        </>
    )
}

export default Post;