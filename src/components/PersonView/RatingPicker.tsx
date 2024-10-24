import { useState } from "react";
import { Star } from "lucide-react";
import styles from "./personView.module.css";

function RatingPicker({ initialRating = 1, readonly = false }) {
  const [rating, setRating] = useState(1);
  const [savedRating, setSavedRating] = useState(initialRating);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (index: number) => {
    if (readonly) return;
    setSavedRating(index);
  };

  const handleEnter = (index: number) => {
    if (readonly) return;
    setRating(index);
    setIsHovering(true);
  };

  const handleLeave = () => {
    if (readonly) return;
    setRating(0);
    setIsHovering(false);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
      }}
    >
      <input type="number" hidden value={savedRating} name="score" readOnly/>
      {[1, 2, 3, 4, 5].map((index) => {
        let isFilled = false;
        if (readonly) {
          isFilled = index <= savedRating;
        } else {
          isFilled =
            (isHovering && index <= rating) ||
            (!isHovering && index <= savedRating);
        }

        const chosenStyle = isFilled && styles.selected;

        return (
          <Star
            key={index}
            className={[styles.star, chosenStyle].join(" ")}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={handleLeave}
          ></Star>
        );
      })}
    </div>
  );
}

export default RatingPicker;
