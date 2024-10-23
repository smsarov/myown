import styles from "./personView.module.css";
import Menu from "../Menu/Menu";
import { usePersonSelected } from "../../contexts/PersonContext";
import { declineWord } from "../../utils/markUtils";

function Header() {
  const person = usePersonSelected();

  if (!person) return <></>;

  const notes = person.notes;
  const marks = notes.reduce(
    (acc, note) => {
      const score = Number(note.score);
      if (score >= 4) {
        acc.good++;
      } else if (score == 3) {
        acc.neutral++;
      } else {
        acc.bad++;
      }

      return acc;
    },
    {
      good: 0,
      neutral: 0,
      bad: 0,
    }
  );

  return (
    <div className={styles.header}>
      <div className={styles.person_data}>
        <div className={styles.person_name}>
          <h1>{person.name}</h1>
          <h1>{person.surname || <span style={{ opacity: 0 }}>.</span>}</h1>
        </div>
        <div></div>
        <div className={styles.person_data_stats}>
          <Menu>
            <li>{declineWord(notes.length, "заметка")}</li>
            <li>{declineWord(marks.good, "хороший")}</li>
            <li>{declineWord(marks.neutral, "нейтральный")}</li>
            <li>{declineWord(marks.bad, "плохой")}</li>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
