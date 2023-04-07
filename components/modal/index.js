"use client";
import { useCallback, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function Modal({ children }) {
  const overlay = useRef();
  const wrapper = useRef();
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div ref={overlay} className={styles.overlay} onClick={onClick}>
      <div ref={wrapper} className={styles.wrapper}>
        {children}
      </div>
    </div>
  );
}
