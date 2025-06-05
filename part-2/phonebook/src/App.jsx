import { useState } from "react";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12--43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const newPerson = (e) => {
    e.preventDefault();
    console.log("button was clicked...", e);
    const addingPerson = {
      name: newName,
      number: newPhone,
    };

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(addingPerson));
      setNewName("");
      setNewPhone("");
    }
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    console.log(e.target.value);
    setNewPhone(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <form onSubmit={newPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPerson.length > 0 ? (
        filteredPerson.map((p) => (
          <p key={p.name}>
            {p.name} - {p.number}
          </p>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default App;
