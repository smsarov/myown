import React, { useEffect } from "react";
import styles from "./modal.module.css";

function Modal({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Modal;
