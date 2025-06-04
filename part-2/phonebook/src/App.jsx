import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const newPerson = (e) => {
    e.preventDefault();
    console.log("button was clicked...", e);
    const addingPerson = {
      name: newName,
    };

    setPersons(persons.concat(addingPerson));
    setNewName("");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={newPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <div key={p.name}>
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
