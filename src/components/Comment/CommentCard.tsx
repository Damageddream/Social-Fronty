import { CommentDisplayI } from "../../interfaces/commentI";
import CommentOptions from "./CommentOptions";

const CommentCard: React.FC<{ comment: CommentDisplayI, newLikeAdded:(componentType: "post" | 'comment', id: string)=>void }> = ({ comment, newLikeAdded }) => {
  return (
    <div>
      <div>
        {comment.author.name}
        {comment.text}
        {}
      </div>
      <CommentOptions
        authorId={comment.author._id}
        commentId={comment._id.toString()}
        orginalText={comment.text}
        postId={comment.post}
        likes={comment.likes}
      />
      <div>Likes:{comment.likes.length}</div>
      <button
        onClick={() =>
          newLikeAdded("comment", comment._id.toString())
        }
      >
        Like
      </button>
    </div>
  );
};

export default CommentCard;
