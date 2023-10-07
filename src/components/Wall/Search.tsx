const Search: React.FC = () => {
  return (
    <form className="searchForm">
      <label htmlFor="search">Search for friends</label>
      <div>
        <input className="searchInput" type="text" />
        <button className="searchbtn" type="submit">
          search
        </button>
      </div>
    </form>
  );
};

export default Search;
