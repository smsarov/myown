import { useState } from "react";
import { createPortal } from "react-dom";

import Menu from "../Menu/Menu";
import Button from "../ui/Button";
import AddUserModal from "./AddUserModal";

import {
  usePersonAll,
  usePersonSelectedChange,
  usePersonSelectedId,
} from "../../contexts/PersonContext";
import { PersonType } from "../../types/PersonType";
import styles from "./sidebar.module.css";

function Sidebar() {
  const persons = usePersonAll();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      style={{
        height: "100dvh",
        position: "sticky",
        top: 0,
        borderRight: "1px solid gray",
        padding: "1rem 0",
        overflowY: "scroll",
        boxSizing: "border-box"
      }}
    >
      <Menu>
        <Button
          onClick={() => setIsModalOpen(true)}
          className={styles.add_button}
        >
          добавить
        </Button>
        {persons.map((person) => (
          <SidebarPerson person={person} key={person.id}></SidebarPerson>
        ))}
      </Menu>
      {isModalOpen &&
        createPortal(
          <AddUserModal close={() => setIsModalOpen(false)}></AddUserModal>,
          document.body
        )}
    </div>
  );
}

function SidebarPerson({ person }: { person: PersonType }) {
  const changeSelectedPerson = usePersonSelectedChange();
  const selectedId = usePersonSelectedId();

  const name = person.name.toLowerCase();
  const surname = person.surname;
  const surnameAbbreviation = surname.length
    ? `${surname.toLowerCase()[0]}.`
    : "";

  const label = `${name} ${surnameAbbreviation}`;

  const seleted = selectedId === person.id;

  return (
    <Button onClick={() => changeSelectedPerson(person.id)} selected={seleted}>
      {label}
    </Button>
  );
}

export default Sidebar;
