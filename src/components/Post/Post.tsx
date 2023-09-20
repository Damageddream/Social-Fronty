import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../utilities/URLs";
import { PostDisplayI } from "../../interfaces/postI";
import AddComment from "../Comment/AddComment";
import useLike from "../../customHooks/useLike";
import PostOptions from "./PostOptions";
import CommentCard from "../Comment/CommentCard";

const Post: React.FC = () => {
  const [like, likeChanged] = useLike();
  const navigate = useNavigate();
  const paramId = useParams();
  const [post, setPost] = useState<PostDisplayI>();
  const [commentsIds, setCommentsIds] = useState<string[]>([]);
  const [commentAdded, setCommentAdded] = useState(0);

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
    const commentsIds = data.comments.map((comment) => comment._id.toString());
    setCommentsIds([...commentsIds]);
  };

  useEffect(() => {
    getPost().catch(() => {
      console.error("Failed to fetch post");
    });
  }, [likeChanged, commentAdded]);

  const handleAddComment = () => {
    setCommentAdded((prev) => prev + 1);
  };

  const newLikeAdded = (componentType: "post" | "comment", id: string) => {
    like({ componentType, id });
  };

  return (
    <>
      <div className="post">
        <div onClick={() => navigate("/wall")}>back</div>
        {post && (
          <div>
            <PostOptions
              authorId={post.author._id}
              postId={post._id.toString()}
              orginalTitle={post.title}
              orginalText={post.text}
              likes={post.likes}
              comments={commentsIds}
            />
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
                    <CommentCard
                      comment={comment}
                      newLikeAdded={newLikeAdded}
                    />
                  </div>
                );
              })
            ) : (
              <div>No comments</div>
            )}
            <>
              <AddComment
                postID={post._id.toString()}
                handleAddComment={handleAddComment}
              />
            </>
          </div>
        )}
        {!post && <div>There is no post with that id</div>}
      </div>
    </>
  );
};

export default Post;
