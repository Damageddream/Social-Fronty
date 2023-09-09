import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../utilities/URLs";
import { PostDisplayI } from "../interfaces/postI";
import AddComment from "./AddComment";
import useCheckUser from "../customHooks/useCheckUser";
import useLike from "../customHooks/useLike";
import PostOptions from "./PostOptions";
import CommentOptions from "./CommentOptions";

const Post: React.FC = () => {
  useCheckUser();
  const [like] = useLike();
  const paramId = useParams();
  const [post, setPost] = useState<PostDisplayI>();
  const [commentsIds, setCommentsIds] = useState<string[]>([])

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
    const commentsIds = data.comments.map(comment=>comment._id.toString())
    setCommentsIds([...commentsIds])
  
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
            <PostOptions authorId = {post.author._id} postId={post._id.toString()} orginalTitle={post.title} orginalText={post.text} likes={post.likes} comments={commentsIds}  />
            {post.title}
            {post.author.name}
            {post.text}
            <div>Likes: {post.likes.length}</div>
            <button
              onClick={() =>
                like({
                  componentType: "post",
                  id: post._id.toString(),
                })
              }
            >
              Like
            </button>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => {
                return (
                  <div key={comment._id}>
                    <div>
                      {comment.author.name}
                      {comment.text}
                    </div>
                    <CommentOptions authorId={comment.author._id} commentId={comment._id.toString()} orginalText={comment.text} postId={post._id.toString()} likes={comment.likes} />
                    <div>Likes:{comment.likes.length}</div>
                    <button
                      onClick={() =>
                        like({
                          componentType: "comment",
                          id: comment._id.toString(),
                        })
                      }
                    >
                      Like
                    </button>
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
