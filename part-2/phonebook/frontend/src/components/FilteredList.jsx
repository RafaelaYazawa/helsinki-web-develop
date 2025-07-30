import Button from "./Button";

const FilteredList = ({ people, onClick }) => {
  if (people.length === 0) {
    return <p>No results found</p>;
  }

  if (people.number && people.number.trim() !== "") {
    return window.alert(
      `${personalbar.name} is already added to phonebook. Do you want to play the older number witht the new one? `
    );
  }

  return (
    <div>
      {people.map((p) => (
        <div key={p.id}>
          {p.name} - {p.number}
          <Button text="Delete" onClick={() => onClick(p.id, p.name)} />
        </div>
      ))}
    </div>
  );
};

export default FilteredList;
