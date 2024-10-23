import { usePersonUpdate, usePersonAll } from "../../contexts/PersonContext";
import { Note } from "../../types/PersonType";

function useCreateNote() {
  const updatePerson = usePersonUpdate();
  const allPersons = usePersonAll();

  function createNote(personId: string, note: Note) {
    const person = allPersons.find((person) => person.id === personId);
    if (!person) throw new Error(`Couldn't find person with id ${personId}`);

    const notes = person.notes;
    const newNotes = [...notes, note];

    const updatedPerson = { ...person, notes: newNotes };

    localStorage.setItem(personId, JSON.stringify(updatePerson));
    updatePerson(personId, updatedPerson);
  }

  return createNote;
}

export default useCreateNote;
