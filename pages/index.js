import { getJSON } from "../utils/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/home.module.scss";
import { useEffect, useCallback } from "react";
import Modal from "../components/modal";

export async function getStaticProps() {
  const res = await getJSON(
    `https://api.gfycat.com/v1/gfycats/trending?count=20`
  );

  return {
    props: {
      photos: res.gfycats
        .filter((i) => i.nsfw === "0")
        .map(({ gfyName, width, height }) => ({ id: gfyName, width, height })),
    },
    revalidate: true,
  };
}

export default function Home({ photos }) {
  const router = useRouter();
  const { photoId } = router.query;

  const onDismiss = useCallback(() => {
    if (photoId) router.back();
  }, [photoId, router]);

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
    <main className={styles.container}>
      <div>
        <h1>NextGram</h1>
      </div>
      {photoId && <Modal id={photoId} onDismiss={onDismiss} />}
      <div className={styles.images}>
        {photos.map(({ id, width, height }) => (
          <div key={id} className={styles.imageContainer}>
            <div key={id} className={styles.image}>
              <Link
                href={{ pathname: "/", query: { photoId: id } }}
                as={`/p/${encodeURI(id)}`}
                shallow
                scroll={false}
              >
                <a>
                  <div className={styles.imageWrapper}>
                    <img
                      width={width}
                      height={height}
                      src={`https://thumbs.gfycat.com/${id}-mobile.jpg`}
                    />
                  </div>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
