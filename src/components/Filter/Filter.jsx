import { useState, useEffect, useMemo } from "react";
import PersonForm from "../PersonForm/PersonForm";
import personService from "../../services/persons";
import Persons from "../Persons/Persons";

const Filter = () => {
  const [searchValue, setSearchValue] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    console.log("Effect: Fetching data...");

    personService
      .getAll()
      .then((returnedPersons) => {
        console.log("Data retrieved:", returnedPersons);
        setPersons(returnedPersons);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("render", persons.length, "persons");

  const searchHandler = (event) => {
    console.log("Search input value:", event.target.value);
    setSearchValue(event.target.value);
  };

  const filteredPersons = useMemo(() => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, persons]);

  const handlePersonAdded = (newPerson) => {
    setPersons([...persons, newPerson]);
  };

  const handlePersonUpdate = (updatedPersons) => {
    setPersons([...updatedPersons])
  }

  const deleteButtonHandler = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id)
      .then(() => { 
       personService
      .getAll()
      .then((returnedPersons) => {
        console.log("Data retrieved:", returnedPersons);
        setPersons(returnedPersons);
      })})
      .catch((error) => {
        console.error("Error in deleting the person:", error);
      })
    }

  }



  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchValue} onChange={searchHandler} />
      </div>
      <PersonForm allPersons={persons} onPersonUpdated={handlePersonUpdate} onPersonAdded={handlePersonAdded} />
      <Persons filteredPersons={filteredPersons} onDeleteButtonClicked={deleteButtonHandler} />
    </>
  );
};

export default Filter;
