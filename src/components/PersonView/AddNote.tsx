import React, { useRef, useState } from "react";
import Button from "../ui/Button";
import styles from "./personView.module.css";
import useCreateNote from "../../hooks/person/useCreateNote";
import RatingPicker from "./RatingPicker";
import Menu from "../Menu/Menu";
import { PersonType } from "../../types/PersonType";
import { Badges, BadgeInput } from "./Badges";

const initialRating = 1;
const maxBadges = 3;

function AddNote({ person }: { person: PersonType }) {
  const [rating, setRating] = useState(initialRating);
  const [badges, setBadges] = useState<string[]>([]);

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
    const score = formData.get("rating")!.toString().trim();
    const badges = formData
      .getAll("badge")
      .map(String)
      .filter((badge) => Boolean(badge));
    createNote(person.id, { title, content, score, badges });
    textAreaRef.current!.value = "";
    titleRef.current!.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className={styles.add_note_form}>
      <div className={styles.note}>
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
      </div>
      <Menu className={styles.add_note_menu}>
        <RatingPicker initialRating={initialRating}></RatingPicker>
        <BadgeInput></BadgeInput>
        <BadgeInput></BadgeInput>
        <BadgeInput></BadgeInput>
        <Button className={styles.save_button} type="submit">
          Сохранить
        </Button>
      </Menu>
    </form>
  );
}

export default AddNote;
