import { useNavigate } from "react-router-dom";
import { PostI } from "../../interfaces/postI";
import "../../assets/styles/postCard.css";
import commentIcon from "../../assets/images/comment.svg";
import likeIcon from "../../assets/images/like.svg";
import timeFormatter from "../../utilities/timeFormatter";
import { Dispatch, SetStateAction } from "react";
import { NavType } from "../../interfaces/wall";

const PostCard: React.FC<{
  post: PostI;
  newLikeAdded: (componentType: "post" | "comment", id: string) => void;
  setNav: Dispatch<SetStateAction<NavType>>;
  setPostId: Dispatch<SetStateAction<string>>;
}> = ({ post, newLikeAdded, setNav, setPostId }) => {
  const navigate = useNavigate();

  const date = timeFormatter(post.timestamp);

  const clickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    setNav("post");
    setPostId(post._id.toString());
  };

  return (
    <div className="postCard">
      <div className="postCard2">
        <div className="postcardHeader">
          <div className="cardName"> {post.author.name}</div>
          <img
            className="cardPhoto"
            src={post.author.photo}
            alt="author photo"
          />
          <div className="cardTime">{date.yearMonthDay}</div>
        </div>
        <div className="postcardMain" onClick={clickHandler}>
          {post.text}
        </div>
      </div>
      <div className="postcardfooter">
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

        <div
          className="commentPost"
          onClick={() => {
            navigate(`/posts/${post._id.toString()}`);
          }}
        >
          <img src={commentIcon} alt="comment icon" />
          {post.comments.length}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
