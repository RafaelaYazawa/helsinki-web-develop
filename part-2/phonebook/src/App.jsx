import { use, useEffect, useState } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import SearchBar from "./components/SearchBar";
import Form from "./components/Form";
import FilteredList from "./components/FilteredList";

const Header = ({ header }) => <h2>{header}</h2>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((initialNames) => setPersons(initialNames));
  }, []);


  const newPerson = (e) => {
    e.preventDefault();
    const addingPerson = {
      name: newName,
      number: newPhone,
    };

    const nameExists = persons.find((person) => person.name === newName);

    if (nameExists) {
      if (nameExists.number !== newPhone) {
        const confirmUpdate = window.confirm(
          `${newName} is already added to phonebook. Do you want to replace the older number with the new one? `
        );

        if (confirmUpdate) {
          const updatedPerson = { ...nameExists, number: newPhone };
          personService
            .update(nameExists.id, updatedPerson)
            .then((returnedPerson) =>
              setPersons(
                persons.map((p) =>
                  p.id !== nameExists.id ? p : returnedPerson
                )
              )
            )
            .catch((error) => {
              setMessage(
                `Information of ${nameExists.name} has already been removed`
              );
              setMessageType("error");
              setTimeout(() => {
                setMessage(null);
                setMessageType(null);
              }, 5000);
            });
          setNewName("");
          setNewPhone("");
          setMessage(
            `${nameExists.name}'s phone number was successfully updated`
          );
          setMessageType("success");
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        }
      } else {
        window.alert(`${newName} is already added to phonebook`);
      }
    } else {
      personService
        .create(addingPerson)
        .then(
          (returnPerson) => setPersons(persons.concat(returnPerson)),
          setNewName(""),
          setNewPhone("")
        )
        .catch((error) => {
          setMessage(`${error.messages}`);
          setMessageType("error");
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        });
      setMessage(`${addingPerson.name} was added to the phonebook`);
      setMessageType("success");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)));
    }
  };

  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    // console.log(e.target.value);
    setNewPhone(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Header header="Phonebook" />
      <Notification message={message} type={messageType} />
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
      <FilteredList people={filteredPerson} onClick={deletePerson} />
    </div>
  );
};

export default App;
