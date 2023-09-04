import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../utilities/URLs";
import { PostDisplayI } from "../interfaces/postI";
import AddComment from "./AddComment";
import useCheckUser from "../customHooks/useCheckUser";


const Post: React.FC = () => {
  useCheckUser();
  const paramId = useParams();
  const [post, setPost] = useState<PostDisplayI>();

  const getPost = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      serverUrl + `/posts/${paramId.id as string}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      }
    );
    const data = (await response.json()) as PostDisplayI;
    setPost(data);
    console.log(data)
  };

  useEffect(() => {
    getPost().catch(() => {
      console.error("Failed to fetch post");
    });
  }, []);

  return (
    <>
      <div className="post">
        {post && (
          <div>
            {post.title}
            {post.author}
            {post.text}
            {post.comments.length > 0 ? (
              post.comments.map((comment) => {
                return (
                  <div key={comment._id}>
                    {comment.author}
                    {comment.text}
                  </div>
                );
              })
            ) : (
              <div>No comments</div>
            )}
            <>
              <AddComment postID={post._id.toString()} />
            </>
          </div>
        )}
        {!post && <div>There is no post with that id</div>}
      </div>
    </>
  );
};

export default Post;
