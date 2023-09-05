import { useState, RefObject } from "react";
import useOutsideClick from "../customHooks/useOutsideClick";

const PostOptions: React.FC = () => {
    
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleClickOutisde = () => {
    setShowOptions(false)
  }

  const ref = useOutsideClick(handleClickOutisde) as RefObject<HTMLDivElement>;

  const toggleOptions = () => {
    setShowOptions(true);
  };

  return (
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
  );
};

export default PostOptions;
