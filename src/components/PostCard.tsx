
const PostCard:React.FC = () => {


    return (
        <div className="postCard">
            <div className="postCheader">
                <div className="postCauthor"></div>
                <div className="postCdate">{"00.00.0000"}</div>
            </div>
            <div className="postCtitle"></div>
            <div className="postCtext"></div>
            <div className="postClikes"></div>
        </div>
    )
}

export default PostCard;