import Photo from "../../../components/frame";
import Modal from "../../../components/modal";
import swagPhotos from "../../../../../photos";

interface pageProps {
  params: { id: string };
}
export default function PhotoModal({ params: { id } }: pageProps) {
  const photos = swagPhotos;
  const photo = photos.find((p) => p.id === id);

  return (
    <>
      <Modal>
        <Photo photo={photo} />
      </Modal>
    </>
  );
}
