import { useEffect, useState } from "react";
import { serverUrl } from "../../utilities/URLs";
import { PostDisplayI } from "../../interfaces/postI";
import AddComment from "../Comment/AddComment";
import useLike from "../../customHooks/useLike";
import PostOptions from "./PostOptions";
import CommentCard from "../Comment/CommentCard";
import "../../assets/styles/post.css";
import timeFormatter from "../../utilities/timeFormatter";


const Post: React.FC<{ postId: string }> = ({ postId }) => {
  const [like, likeChanged] = useLike();
  const [post, setPost] = useState<PostDisplayI>();
  const [commentsIds, setCommentsIds] = useState<string[]>([]);
  const [commentAdded, setCommentAdded] = useState(0);


  const getPost = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(serverUrl + `/posts/${postId}/comments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token as string}`,
      },
    });
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
            <div className="postcardHeader">
              <div className="cardName"> {post.author.name}</div>
              <img
                className="cardPhoto"
                src={post.author.photo}
                alt="author photo"
              />
              <div className="cardTime">{timeFormatter(post.timestamp).yearMonthDay}</div>
            </div>
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
