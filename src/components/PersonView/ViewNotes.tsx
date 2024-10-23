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
    <div className={styles.notes_view}>
      {notes.toReversed().map((note, index) => (
        <div>
          {index > 0 && (
            <hr style={{ borderColor: "grey", marginBottom: "2rem" }}></hr>
          )}
          <p
            className={styles.note_header}
            style={{ whiteSpace: "break-spaces", width: "100%", margin: 0 }}
          >
            {note.title}
          </p>
          <span
            className={styles.note_input}
            style={{ whiteSpace: "break-spaces" }}
          >
            {note.content}
          </span>

          <div
            style={{
              height: "1rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ width: "fit-content" }}>
              <RatingPicker
                readonly={true}
                initialRating={Number(note.score)}
              ></RatingPicker>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewNotes;
