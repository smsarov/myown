import React, { useRef, useState } from "react";
import Button from "../ui/Button";
import styles from "./personView.module.css";
import useCreateNote from "../../hooks/person/useCreateNote";
import { usePersonSelected } from "../../contexts/PersonContext";
import RatingPicker from "./RatingPicker";
import Menu from "../Menu/Menu";

const initialRating = 1;

function AddNote() {
  const selectedPerson = usePersonSelected();
  const createNote = useCreateNote();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);

  const [rating, setRating] = useState(initialRating);

  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "5px";
    target.style.height = Math.max(target.scrollHeight, 200) + "px";
  };

  const handleInputPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" || e.key == "ArrowDown") {
      textAreaRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")!.toString().trim();
    const content = formData.get("content")!.toString().trim();
    const score = formData.get("rating")!.toString().trim();

    console.log(title, content, score);
    createNote(selectedPerson!.id, { title, content, score });
    textAreaRef.current!.value = "";
    titleRef.current!.value = "";
  };

  return (
    <>
      <form id="note-input-form" onSubmit={handleSubmit} className={styles.note}>
        <textarea
          ref={titleRef}
          className={styles.title}
          name="title"
          maxLength={40}
          placeholder="Заголовок"
          onKeyUp={handleInputPress}
        ></textarea>
        <textarea
          ref={textAreaRef}
          className={styles.content}
          required
          name="content"
          onChange={handleChangeContent}
          placeholder="Tекст"
        ></textarea>
        <input type="number" name="rating" hidden readOnly value={rating} />
      </form>
      <Menu className={styles.add_note_menu}>
        <RatingPicker
          onChange={setRating}
          initialRating={initialRating}
        ></RatingPicker>
        <Button
          className={styles.save_button}
          type="submit"
          form="note-input-form"
        >
          Сохранить
        </Button>
      </Menu>
    </>
  );
}

export default AddNote;
