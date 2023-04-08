import Link from "next/link";
import styles from "../../styles/home.module.scss";
import swagPhotos from "../../photos";
import BlurImage from "../../components/blur-image";

export default function Home() {
  const photos = swagPhotos;

  return (
    <main className={styles.container}>
      <div>
        <h1>NextGram</h1>
      </div>
      <div className={styles.images}>
        {photos.map(({ id, imageSrc }) => (
          <div key={id} className={styles.imageContainer}>
            <div key={id} className={styles.imageWrapper}>
              <Link href={`/photos/${id}`}>
                <BlurImage
                  alt=""
                  src={imageSrc}
                  height={500}
                  width={500}
                  objectFit="cover"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
