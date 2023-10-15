import Persons from "./components/Persons/Persons";
import PersonForm from "./components/PersonForm/PersonForm";
import Filter from "./components/Filter/Filter";

const App = ({ persons }) => {
  
  
 

  return (
    <>
      <Filter persons={persons} />
    </>
  );
};

export default App;

