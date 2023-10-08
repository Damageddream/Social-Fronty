import { useEffect, useState } from "react";
import { serverUrl } from "../../utilities/URLs";
import { PostDisplayI } from "../../interfaces/postI";
import AddComment from "../Comment/AddComment";
import useLike from "../../customHooks/useLike";
import PostOptions from "./PostOptions";
import CommentCard from "../Comment/CommentCard";
import "../../assets/styles/post.css";
import timeFormatter from "../../utilities/timeFormatter";
import likeIcon from "../../assets/images/like.svg";
import { LayoutGroup, motion } from "framer-motion";


const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

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
    <div className="post">
      {post && (
        <div>
          <div className="postCard">
            <PostOptions
              authorId={post.author._id}
              postId={post._id.toString()}
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
              <div className="cardTime">
                {timeFormatter(post.timestamp).yearMonthDay}
              </div>
            </div>
            <div className="postcardMain">{post.text}</div>
            <div className="likePost">
              <img
                onClick={() => {
                  newLikeAdded("post", post._id.toString());
                }}
                src={likeIcon}
                alt="like icon"
              />
              {post.likes.length}
            </div>
          </div>
          <LayoutGroup>
            <AddComment
              postID={post._id.toString()}
              handleAddComment={handleAddComment}
            />
            <motion.div className="spring" layout transition={spring} animate={{
                opacity: 1,
              }}>
              {post.comments.length > 0 ? (
                post.comments.map((comment) => {
                  return (
                    <div className="comment" key={comment._id}>
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
            </motion.div>
          </LayoutGroup>
        </div>
      )}
      {!post && <div>There is no post with that id</div>}
    </div>
  );
};
export default Post;
