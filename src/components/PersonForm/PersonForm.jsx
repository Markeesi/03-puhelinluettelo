import { useState } from "react";
import personService from "../../services/persons";

const PersonForm = ({ onPersonAdded, onPersonUpdated }) => {
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  const addNewContact = (event) => {
    event.preventDefault();
    personService.getAll().then((persons) => {
      const existingPerson = persons.find((person) => person.name === newName);

      if (existingPerson) {
        if (window.confirm(`${newName} is already in the phonebook. Do you want to update their number?`)) {
          const updatedContact = { ...existingPerson, number: newNumber };
          personService
            .update(existingPerson.id, updatedContact)
            .then(() => {
              // Fetch the updated list of persons
              personService.getAll().then((returnedPersons) => {
                onPersonUpdated(returnedPersons);
                setNewName("");
                setNewNumber("");
              });
            })
            .catch((error) => {
              console.error("Error updating the person:", error);
            });
        }
      } else if (newNumber.length === 11 && !persons.some((person) => person.number === newNumber)) {
      console.log("Adding a new contact...");
      const newContact = {
        name: newName,
        number: newNumber,
      };

      personService.create(newContact).then((returnedPerson) => {
        onPersonAdded(returnedPerson); // Trigger a callback to update the state in the parent component (App)
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(`Invalid phone number or the entered phone number already exists.`);
    }
  });
  };

  return (
    <>
      <h3>add a new</h3>
      <form onSubmit={addNewContact}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />{" "}
          <br />
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;