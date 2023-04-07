"use client";
import Image from "next/legacy/image";
import styles from "./styles.module.css";
import cn from "clsx";

export default function BlurImage(props) {
  // const [isLoading, setLoading] = useState(true);
  return (
    <Image
      {...props}
      className={cn(styles["image-transition"], styles["image-loaded"])}
      // onLoadingComplete={() => setLoading(false)}
    />
  );
}
