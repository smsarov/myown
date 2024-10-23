import React, { useEffect, useRef } from "react";

function Modal({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        display: "grid",
        placeItems: "center",
        top: 0,
        left: 0,
        height: "100dvh",
        width: "100dvw",
        zIndex: 1000,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          boxShadow: "-4px 4px 24px 8px rgba(128, 128, 128, 0.5)",
          background: "rgb(255, 239, 215)",
          borderRadius: "1rem",
          padding: "2rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
