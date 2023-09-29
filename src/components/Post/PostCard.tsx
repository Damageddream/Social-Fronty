import { useNavigate } from "react-router-dom";
import { PostI } from "../../interfaces/postI";
import "../../assets/styles/postCard.css";
import commentIcon from "../../assets/images/comment.svg";
import likeIcon from "../../assets/images/like.svg";

const PostCard: React.FC<{
  post: PostI;
  newLikeAdded: (componentType: "post" | "comment", id: string) => void;
}> = ({ post, newLikeAdded }) => {
  const navigate = useNavigate();

  return (
    <div className="postCard">
      <div onClick={() => navigate(`/posts/${post._id.toString()}`)}>
        <div className="postcardHeader">
          <div className="cardName"> {post.author.name}</div>
          <img className="cardPhoto" src={post.author.photo} alt="author photo" />
          <div className="cardTime">{post.timestamp}</div>
        </div>
        <div className="postcardMain">{post.text}</div>
      </div>
      <div>
        <button
          onClick={() => {
            newLikeAdded("post", post._id.toString());
          }}
        >
          Like
        </button>
        <div className="likePost">
          <img src={likeIcon} alt="like icon" />
          Likes: {post.likes.length}
        </div>
      </div>
      <div
        className="commentPost"
        onClick={() => {
          navigate(`/posts/${post._id.toString()}`);
        }}
      >
        <img src={commentIcon} alt="comment icon" />
        Comments: {post.comments.length}
      </div>
    </div>
  );
};

export default PostCard;
