import { useState } from "react";
import personService from "../../services/persons";
import Notification from "../Notification/Notification";

const PersonForm = ({ onPersonAdded, onPersonUpdated}) => {
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

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
                setNotification(`Updated ${newName}`);
                setNotificationType("success");
                setNewName("");
                setNewNumber("");
                setTimeout(() => {
                  setNotification(null);
                }, 3000);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
            })
            .catch((error) => {
              console.error("Error updating the person:", error);
              setNotification(`Error updating ${newName}`);
              setNotificationType("error");
              setTimeout(() => {
                setNotification(null);
              }, 3000);
            });
        }
      } else if (newNumber.length >= 11 && !persons.some((person) => person.number === newNumber)) {
        console.log("Adding a new contact...");
        const newContact = {
          name: newName,
          number: newNumber,
        };

        personService.create(newContact).then((returnedPerson) => {
          onPersonAdded(returnedPerson);
          setNotification(`Added ${newName}`);
          setNotificationType("success");
          setNewName("");
          setNewNumber("");
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error creating the person:", error);
          setNotification(`Error adding ${newName}`);
          setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setNotification("Error fetching data. Please try again later.");
      setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 3000);
    });
  };

  return (
    <div className="personForm">
      <h3>add a new</h3>
      {notification && <Notification type={notificationType} message={notification} />}
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
    </div>
  );
};

export default PersonForm;
