import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../utilities/URLs";
import { PostDisplayI } from "../interfaces/postI";
import AddComment from "./AddComment";

const Post: React.FC = () => {

const paramId = useParams()
const [post, setPost] = useState<PostDisplayI>()

const getPost = async () => {
    const token = localStorage.getItem("token")
    console.log(paramId.id)
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