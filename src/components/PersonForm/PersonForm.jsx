import { useState } from "react";

const PersonForm = (initialPersons) => {

    const [persons, setPersons] = useState(initialPersons); // Remove the curly braces
    const [newNumber, setNewNumber] = useState("");
    const [newName, setNewName] = useState("");

    const addNewContact = (event) => {
        event.preventDefault();
        if (persons.some((person) => person.name === newName) && person.number.length === 10 || persons.some((person) => person.number === newNumber)) {
          alert(`${newName} already exists in the phonebook or phonenumber is invalid length or the entered phonenumber already exists.`);
    
        }
        else {
        const newContact = {
          name: newName,
          number: newNumber,
          id: Date.now(),
        };
    
        setPersons([...persons, newContact]);
        setNewName("");
        setNewNumber("");
        }
      }

      return (<>
        <h3>add a new</h3>
        <form onSubmit={addNewContact}>
          <div>
            name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /> <br/>
            number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        </>
      )
}

export default PersonForm;