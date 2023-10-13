import UserI from "../../interfaces/userI";
import { Dispatch, SetStateAction, useState } from "react";

const Search: React.FC<{
  strangers: UserI[] | undefined;
  setStrangers: Dispatch<SetStateAction<UserI[] | undefined>>;
  rerender: Dispatch<SetStateAction<number>>;
}> = ({strangers, setStrangers, rerender}) => {

  const [searchTarget, setSearchTarget] = useState("")

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) =>{
    setSearchTarget(e.target.value)
    const result = strangers?.filter((stranger)=>stranger.name.toLowerCase().includes(searchTarget))
    setStrangers(result)
    rerender(prev=>prev+1)
  }

  return (
    <form className="searchForm">
      <label htmlFor="search">Search for friends</label>
      <div>
        <input onChange={changeHandler} className="searchInput" type="text" />
        <button className="searchbtn" type="submit">
          search
        </button>
      </div>
    </form>
  );
};

export default Search;
