import { useState } from "react";
import Header from "./Header";
import Menu from "../Menu/Menu";
import styles from "./personView.module.css";
import Button from "../ui/Button";
import AddNote from "./AddNote";
import ViewNotes from "./ViewNotes";
import {
  usePersonSelected,
  usePersonSelectedChange,
} from "../../contexts/PersonContext";
import monkey from "../../assets/monkey-monkeytype.gif";

function PersonView() {
  const [mode, setMode] = useState<"write" | "view">("write");
  const person = usePersonSelected();
  const changeSelectedPerson = usePersonSelectedChange();

  if (!person)
    return (
      <div style={{ flexGrow: 1, display: "grid", placeItems: "center" }}>
        <img src={monkey} width={200} height={200}></img>
      </div>
    );

  return (
    <div className={styles.container}>
      <Header person={person}></Header>
      {mode === "view" ? (
        <ViewNotes person={person}></ViewNotes>
      ) : (
        <AddNote person={person}></AddNote>
      )}

      <div className={styles.sidebar}>
        <Menu>
          <Button onClick={() => changeSelectedPerson()}>закрыть</Button>
          <Button onClick={() => setMode("view")} selected={mode === "view"}>
            посмотреть
          </Button>
          <Button onClick={() => setMode("write")} selected={mode === "write"}>
            написать
          </Button>
        </Menu>
      </div>
    </div>
  );
}

export default PersonView;
