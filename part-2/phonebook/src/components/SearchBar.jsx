const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <p>
        Filter shown with
        <input value={value} onChange={onChange} />
      </p>
    </div>
  );
};

export default SearchBar;
