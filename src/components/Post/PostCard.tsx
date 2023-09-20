import { useNavigate } from "react-router-dom";
import { PostI } from "../../interfaces/postI";

const PostCard: React.FC<{ post: PostI, newLikeAdded:(componentType: "post" | 'comment', id: string)=>void }> = ({ post, newLikeAdded }) => {
  const navigate = useNavigate();

  return (
    <div className="postCard">
      <div onClick={() => navigate(`/posts/${post._id.toString()}`)}>
        {post.title}
        {post.text}
        {post.author.name}
      </div>
      <div>
        <button
          onClick={() => {
            newLikeAdded("post", post._id.toString());
          }}
        >
          Like
        </button>
        <div>Likes: {post.likes.length}</div>
      </div>
      <div
        onClick={() => {
          navigate(`/posts/${post._id.toString()}`);
        }}
      >
        Comments: {post.comments.length}
      </div>
    </div>
  );
};

export default PostCard;
