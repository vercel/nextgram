import Image from "next/image";
import styles from "./styles.module.css";
import { useState } from "react";
import cn from "clsx";

export default function BlurImage(props) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      {...props}
      className={cn(
        styles["image-transition"],
        isLoading ? styles["image-loading"] : styles["image-loaded"]
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
