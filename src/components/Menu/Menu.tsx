import React, { useState } from "react";
import styles from "./menu.module.css";

interface MenuProps {
  children: React.ReactNode[],
  className?: string;
}

function Menu({children, className} : MenuProps) {
  const [selected, setSelected] = useState(1);

  return (
    <ul className={[styles.sidebar, className].join(' ')}>
      {children}
    </ul>
  );
}

export default Menu;
