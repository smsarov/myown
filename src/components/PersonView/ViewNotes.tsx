import { usePersonSelected } from "../../contexts/PersonContext";
import styles from "./personView.module.css";
import RatingPicker from "./RatingPicker";

function ViewNotes() {
  const person = usePersonSelected();
  const notes = person!.notes;

  if (!notes || !notes.length) {
    return (
      <p className={styles.note_header} style={{ color: "grey", margin: 0 }}>
        Пока записок нет :(
      </p>
    );
  }

  return (
    <>
      <div>
        {notes.toReversed().map((note, index) => (
          <article key={`note:${person?.id}:${index}`} className={styles.note}>
            <p className={styles.title}>{note.title}</p>
            <p className={styles.content}>{note.content}</p>
            <div className={styles.note_footer}>
              <div style={{ width: "fit-content" }}>
                <RatingPicker
                  readonly={true}
                  initialRating={Number(note.score)}
                ></RatingPicker>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div></div>
    </>
  );
}

export default ViewNotes;
