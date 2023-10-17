const Persons = ({ filteredPersons }) => {
  return (
    <>
      <h3>Numbers</h3>
      {filteredPersons.map((person) => (
        <section key={person.id}>
          <p>
            {person.name} {person.number}
          </p>
        </section>
      ))}
    </>
  );
};

export default Persons;
