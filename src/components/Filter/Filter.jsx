import { useState, useEffect, useMemo } from "react";
import PersonForm from "../PersonForm/PersonForm";
import personService from "../../services/persons";
import Persons from "../Persons/Persons";
import Notification from "../Notification/Notification";

const Filter = () => {
  const [searchValue, setSearchValue] = useState("");
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");
  const [updateTrigger, setUpdateTrigger] = useState(false);


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
  }, [updateTrigger]);
  console.log("render", persons.length, "persons");

  const searchHandler = (event) => {
    const inputValue = event.target.value;
    console.log("Search input value:", inputValue);
  
    setSearchValue(inputValue); // Always update the searchValue with the current input value
  };
  

  const filteredPersons = useMemo(() => {
    return persons.filter(
      (person) =>
        person.name &&
        person.number &&
        person.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, persons]);

  const handlePersonAdded = (newPerson) => {
    setPersons([...persons, newPerson]);
  };

  const handlePersonUpdate = (updatedPerson) => {
    const updatedPersons = persons.map((person) =>
      person.id === updatedPerson.id ? updatedPerson : person
    );
    setPersons(updatedPersons);
    setUpdateTrigger((prev) => !prev);
  };

  const deleteButtonHandler = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          personService
            .getAll()
            .then((returnedPersons) => {
              setPersons(returnedPersons);
              setNotification(`Deleted ${person.name}`);
              setNotificationType("success");
              setTimeout(() => {
                setNotification(null);
              }, 3000); // Clear the success message after 3 seconds
            })
            .catch((error) => {
              console.error("Error in deleting the person:", error);
              setNotification("Error deleting the person");
              setNotificationType("error");
              setTimeout(() => {
                setNotification(null);
              }, 3000); // Clear the success message after 3 seconds
            });
        })
        .catch((error) => {
          console.error("Error in deleting the person:", error);
          setNotification("Error deleting the person");
          setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 3000); // Clear the success message after 3 seconds
        });
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <div className="filter">
        filter shown with <input value={searchValue} onChange={searchHandler} />
      </div>
      <PersonForm
        className="personForm"
        allPersons={persons}
        onPersonUpdated={handlePersonUpdate}
        onPersonAdded={handlePersonAdded}
      />
      <Persons
        className="person"
        filteredPersons={filteredPersons}
        onDeleteButtonClicked={deleteButtonHandler}
      />
    </>
  );
};

export default Filter;
