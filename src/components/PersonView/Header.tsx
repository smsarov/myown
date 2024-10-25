import styles from "./personView.module.css";
import Menu from "../Menu/Menu";
import { declineWord } from "../../utils/markUtils";
import { PersonType } from "../../types/PersonType";

function Header({ person }: { person: PersonType }) {
  const notes = person.notes;
  const marks = countMarks(notes);
  
  return (
    <div className={styles.person_data}>
      <h1>
        {person.name}
        <br />
        {person.surname || <br />}
      </h1>
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
  );
}

export default Header;

function countMarks(notes: PersonType["notes"]) {
  return notes.reduce(
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
}
