import { useState } from "react";
import PersonForm from "../PersonForm/PersonForm";
import Persons from "../Persons/Persons";

const Filter = ({persons}) => {

    const [searchValue, setSearchValue] = useState("")



    const searchHandler = (event) => {
      setSearchValue(event.target.value);
    }
  
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(searchValue.toLocaleLowerCase()));

    return (
        <>
                <h2>Phonebook</h2>
                <div>
                filter shown with <input value={searchValue} onChange={searchHandler}/>
                </div>
                <PersonForm initialPersons={persons} />
                <Persons filteredPersons={filteredPersons} />
        </>

    )

};

export default Filter;