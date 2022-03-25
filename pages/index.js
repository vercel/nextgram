import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/home.module.scss';
import Modal from '../components/modal';
import swagPhotos from '../photos';

export function getStaticProps() {
  return { props: { photos: swagPhotos } };
}

export default function Home({ photos }) {
  const router = useRouter();
  const { photoId } = router.query;
  const photo = photoId && photos.find((p) => p.id === photoId);

  const onDismiss = useCallback(() => {
    if (photoId) router.back();
  }, [photoId, router]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <main className={styles.container}>
      <div>
        <h1>NextGram</h1>
      </div>
      {photoId && <Modal photo={photo} onDismiss={onDismiss} />}
      <div className={styles.images}>
        {photos.map(({ id, imageSrc }) => (
          <div key={id} className={styles.imageContainer}>
            <div key={id} className={styles.imageWrapper}>
              <Link
                href={{ pathname: '/', query: { photoId: id } }}
                as={`/p/${encodeURI(id)}`}
                shallow
                scroll={false}
              >
                <a>
                  <Image
                    alt=""
                    src={imageSrc}
                    height={500}
                    width={500}
                    objectFit="cover"
                  />
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
