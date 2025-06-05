import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Form from "./components/Form";
import FilteredList from "./components/FilteredList";

const Header = ({ header }) => <h2>{header}</h2>;

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
      <Header header="Phonebook" />
      <SearchBar value={searchTerm} onChange={handleSearchChange} />
      <Form
        value={newName}
        onSubmit={newPerson}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        nameValue={newName}
        phoneValue={newPhone}
      />
      <Header header="Telephones" />
      <FilteredList people={filteredPerson} />
    </div>
  );
};

export default App;
