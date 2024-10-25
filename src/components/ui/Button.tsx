import styles from "./button.module.css";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  selected?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  onClick,
  className,
  selected,
  ...attrs
}: ButtonProps) {
  const selectedStyle = selected ? styles.selected : "";
  return (
    <button
      {...attrs}
      className={[styles.button, selectedStyle, className].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
