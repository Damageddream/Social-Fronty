import UserI from "../../interfaces/userI";
import { useState } from "react";

const Search: React.FC<{
  strangers: UserI[] | undefined;
  updateStrangers: (newStrangersArray: UserI[]) => void;
}> = ({ strangers, updateStrangers }) => {
  const [searchTarget, setSearchTarget] = useState("");

  const changeHandler:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => {
      const inputValue = e.target.value
    setSearchTarget(inputValue);
    const result = strangers?.filter((stranger) =>
      stranger.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (result) {
      updateStrangers(result);
    }
  };

  return (
    <form className="searchForm">
      <label htmlFor="search">Search for friends</label>
      <div>
        <input
          onChange={changeHandler}
          className="searchInput"
          type="text"
          value={searchTarget}
          id='search'
        />
      </div>
    </form>
  );
};

export default Search;
