import Image from "next/legacy/image";
import styles from "./styles.module.css";

export default function Photo({ photo }) {
  return (
    <div className={styles.photo}>
      <div className={styles.image}>
        <Image
          alt=""
          src={photo.imageSrc}
          height={600}
          width={600}
          objectFit="cover"
        />
      </div>

      <div className={styles.sidebar}>
        <ul className={styles.sidebarList}>
          <h3>{photo.name}</h3>
          <p>Taken by {photo.username}</p>
        </ul>
      </div>
    </div>
  );
}
