const FilteredList = ({ people }) => {
  if (people.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <>
      {people.map((p) => (
        <p key={p.name}>
          {p.name} - {p.number}
        </p>
      ))}
    </>
  );
};

export default FilteredList;
