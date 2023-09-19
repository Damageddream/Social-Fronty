import { useNavigate } from "react-router-dom";
import { PostI } from "../interfaces/postI";
import useLike from "../customHooks/useLike";

const PostCard: React.FC<{ post: PostI, newLikeAdded:(like:number)=>number }> = ({ post  }) => {
  const navigate = useNavigate();
  const [like, likeChanged] = useLike();

  const newLikeAdded = () => {

  }

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
            like({ componentType: "post", id: post._id.toString() });
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
