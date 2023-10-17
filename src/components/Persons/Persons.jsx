const Persons = ({ filteredPersons, onDeleteButtonClicked }) => {


  return (
    <>
      <h3>Numbers</h3>
      {filteredPersons.map((person) => (
        <section key={person.id}>
          <p>
            {person.name} {person.number}
            <button onClick={() => onDeleteButtonClicked(person)}>Delete</button>
          </p>
        </section>
      ))}
    </>
  );
};

export default Persons;
