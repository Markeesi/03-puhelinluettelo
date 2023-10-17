import { useState, useEffect } from "react";
import Filter from "./components/Filter/Filter";
import personService from "./services/persons";

const App = () => {
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

  return (
    <Filter persons={persons} setPersons={setPersons} />
  );
};

export default App;

