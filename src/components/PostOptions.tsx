import { useState, RefObject, useEffect } from "react";
import useOutsideClick from "../customHooks/useOutsideClick";
import { UserReduxI } from "../interfaces/userI";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const PostOptions: React.FC<{ authorId: string }> = ({ authorId }) => {
  const user: UserReduxI = useSelector((state: RootState) => state.user);

  const [showOptions, setShowOptions] = useState(false);
  const [userIsAuthor, setUserIsAuthor] = useState(false);

  const handleClickOutisde = () => {
    setShowOptions(false);
  };

  const ref = useOutsideClick(handleClickOutisde) as RefObject<HTMLDivElement>;

  const toggleOptions = () => {
    setShowOptions(true);
  };

  useEffect(() => {
    user._id, authorId;
    if (user._id === authorId) {
      setUserIsAuthor(true);
    }
  }, [authorId, user._id]);

  return (
    <>
      {userIsAuthor && (
        <>
          {showOptions ? (
            <div ref={ref}>
              <div>Edit</div>
              <div>Delete</div>
            </div>
          ) : (
            <div onClick={toggleOptions}>Options</div>
          )}
        </>
      )}
    </>
  );
};

export default PostOptions;
