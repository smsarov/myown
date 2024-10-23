import React, { useRef } from "react";
import Button from "../ui/Button";
import styles from "./personView.module.css";
import useCreateNote from "../../hooks/person/useCreateNote";
import { usePersonSelected } from "../../contexts/PersonContext";
import RatingPicker from "./RatingPicker";
import Menu from "../Menu/Menu";

function AddNote() {
  const selectedPerson = usePersonSelected();
  const createNote = useCreateNote();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);

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
    const score = formData.get("score")!.toString().trim();
    createNote(selectedPerson!.id, { title, content, score });
    textAreaRef.current!.value = "";
    titleRef.current!.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <textarea
          ref={titleRef}
          name="title"
          maxLength={40}
          className={styles.note_header}
          placeholder="Заголовок"
          onKeyUp={handleInputPress}
        ></textarea>
        <Menu>
          <RatingPicker></RatingPicker>
          <Button className={styles.save_button}>Сохранить</Button>
        </Menu>
      </div>

      <textarea
        ref={textAreaRef}
        required
        name="content"
        onChange={handleChangeContent}
        className={styles.note_input}
        placeholder="Tекст"
      ></textarea>
    </form>
  );
}

export default AddNote;
