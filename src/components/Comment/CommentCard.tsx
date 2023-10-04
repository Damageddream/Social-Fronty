import { CommentDisplayI } from "../../interfaces/commentI";
import CommentOptions from "./CommentOptions";
import likeIcon from "../../assets/images/like.svg";

const CommentCard: React.FC<{
  comment: CommentDisplayI;
  newLikeAdded: (componentType: "post" | "comment", id: string) => void;
}> = ({ comment, newLikeAdded }) => {
  return (
    <div className="singlecomment">
      <div>
      <img
        className="commentPhoto"
        src={comment.author.photo}
        alt="author photo"
      />
      </div>

      <div className="commentmain">
        <div className="commentname">{comment.author.name}</div>
        <div className="commenttext">{comment.text}</div>

        <CommentOptions
          authorId={comment.author._id}
          commentId={comment._id.toString()}
          orginalText={comment.text}
          postId={comment.post}
          likes={comment.likes}
        />
        <div className="likeComment">
          <img
            onClick={() => {
              newLikeAdded("comment", comment._id.toString());
            }}
            src={likeIcon}
            alt="like icon"
          />
          {comment.likes.length}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
