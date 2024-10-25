import React from "react";
import styles from "./personView.module.css";

type BadgesProps = {
  children?: React.ReactNode;
  onChange?: (badges: string[]) => void;
};

function Badges({ children }: BadgesProps) {
  return (
    <>
      <form className={styles.badges}>{children}</form>
    </>
  );
}

function BadgeInput() {
  return (
    <input
      name="badge"
      type="text"
      maxLength={14}
      placeholder="пометка"
      className={styles.badge}
    ></input>
  );
}

export { Badges, BadgeInput };
