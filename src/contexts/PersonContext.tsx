import React, { createContext, useContext, useState, useCallback } from "react";
import { PersonType } from "../types/PersonType"
import { PersonProps } from "../hooks/person/createPerson";
import createPerson from "../hooks/person/createPerson";

type PersonsContextType = {
  persons: PersonType[];
  selected: string | undefined;
  setSelected: (id?: string) => void;
  addPerson: (data: PersonProps) => PersonType;
  deletePerson: (id: string) => void;
  updatePerson: (id: string, person: PersonType) => PersonType;
};

const PersonContext = createContext<PersonsContextType | undefined>(undefined);

const PersonContextProvider = ({ children }: { children: React.ReactNode }) => {
  const allPersons: PersonType[] = Object.values({ ...localStorage }).map(
    (personJSON) => JSON.parse(personJSON)
  );
  const [persons, setPersons] = useState<PersonType[]>(allPersons);
  const [selected, setSelectedState] = useState<string | undefined>(undefined);

  const addPerson = useCallback(
    (data: PersonProps) => {
      const newPerson = createPerson(data);
      const id = newPerson.id;
      setPersons([...persons, newPerson]);
      setSelectedState(id);
      return newPerson;
    },
    [persons]
  );

  const deletePerson = useCallback(
    (id: string) => {
      setPersons(persons.filter((person) => person.id !== id));
    },
    [persons]
  );

  const updatePerson = useCallback(
    (id: string, person: PersonType) => {
      const index = persons.findIndex((person) => person.id === id);
      if (index < 0) {
        throw new Error(`Can't update: id ${id} doesn't exist`);
      }
      const updatedPerson = { ...person, id: persons[index].id };
      const personsCopy = [...persons];
      personsCopy[index] = updatedPerson;
      setPersons(personsCopy);
      return updatedPerson;
    },
    [persons]
  );

  function setSelected(id?: string) {
    if(!id) setSelectedState(undefined);
    const index = persons.findIndex((person) => person.id === id);
    if (index < 0) {
      throw new Error(`Can't change selection: id ${id} doesn't exist`);
    }

    setSelectedState(id);
  }

  return (
    <PersonContext.Provider
      value={{
        persons,
        selected,
        addPerson,
        updatePerson,
        deletePerson,
        setSelected,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
};

function usePersonAddition() {
  const personContext = useContext(PersonContext);
  if (!personContext)
    throw new Error("usePersonAddition must be used inside PersonContext");
  return (data: PersonProps) => {
    const newPerson = personContext.addPerson(data);
    localStorage.setItem(newPerson.id, JSON.stringify(newPerson));
  };
}

function usePersonDeletion() {
  const personContext = useContext(PersonContext);
  if (!personContext)
    throw new Error("usePersonDeletion must be used inside PersonContext");
  return (id: string) => {
    personContext.deletePerson(id);
    localStorage.removeItem(id);
  };
}

function usePersonUpdate() {
  const personContext = useContext(PersonContext);
  if (!personContext)
    throw new Error("usePersonUpdate must be used inside PersonContext");
  return (id: string, person: PersonType) => {
    const updatedPerson = personContext.updatePerson(id, person);
    localStorage.setItem(id, JSON.stringify(updatedPerson));
  };
}

function usePersonSelectedChange() {
  const personContext = useContext(PersonContext);
  if (!personContext)
    throw new Error(
      "usePersonSelectedChange must be used inside PersonContext"
    );
  return personContext.setSelected;
}

function usePersonSelectedId() {
  const personContext = useContext(PersonContext);
  if (!personContext)
    throw new Error("usePersonSelectedId must be used inside PersonContext");
  return personContext.selected;
}

function usePersonSelected() {
  const personContext = useContext(PersonContext);
  if (!personContext)
    throw new Error("usePersonSelected must be used inside PersonContext");
  return personContext.persons.find(
    (person) => person.id === personContext.selected
  );
}

function usePersonAll() {
  const personContext = useContext(PersonContext);
  if (!personContext)
    throw new Error("usePersonSelected must be used inside PersonContext");
  return personContext.persons;
}

export { PersonContextProvider };
export { usePersonAddition, usePersonDeletion, usePersonUpdate };
export { usePersonAll, usePersonSelected, usePersonSelectedId };
export { usePersonSelectedChange };
