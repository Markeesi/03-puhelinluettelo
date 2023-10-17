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

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchValue} onChange={searchHandler} />
      </div>
      <PersonForm initialPersons={persons} onPersonAdded={handlePersonAdded} />
      <Persons filteredPersons={filteredPersons} />
    </>
  );
};

export default Filter;
