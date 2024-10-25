import React from "react";
import { usePersonAddition } from "../../contexts/PersonContext";
import styles from "./sidebar.module.css";
import { Check, X } from "lucide-react";

function AddUserModal({ close }: { close: () => void }) {
  const addPerson = usePersonAddition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")!.toString().trim();
    const surname = formData.get("surname")!.toString().trim();
    addPerson({ name, surname });
    close();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <span>Добавить</span>
        <nav className={styles.buttons}>
          <button type="submit">
            <Check style={{ color: "green" }} />
          </button>
          <button onClick={close}>
            <X style={{ color: "red" }} />
          </button>
        </nav>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Имя"
        minLength={1}
        className={styles.input}
        required
        autoFocus
      />
      <input
        type="text"
        minLength={1}
        name="surname"
        placeholder="Фамилия"
        className={styles.input}
      />
    </form>
  );
}

export default AddUserModal;
