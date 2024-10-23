import React from "react";
import styles from "./menu.module.css";

interface MenuProps {
  children: React.ReactNode[],
  className?: string;
}

function Menu({children, className} : MenuProps) {
  return (
    <ul className={[styles.sidebar, className].join(' ')}>
      {children}
    </ul>
  );
}

export default Menu;
