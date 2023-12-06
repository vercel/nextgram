import Frame from '../../../../components/frame/Frame'
import Modal from '../../../../components/modal/Modal'
import type { Photo } from '../../../../photos'
import swagPhotos from '../../../../photos'

const PhotoModal = ({
  params: { id: photoId },
}: {
  params: { id: string }
}) => {
  const photos = swagPhotos
  const photo: Photo = photos.find((p) => p.id === photoId)!

  return (
    <Modal>
      <Frame photo={photo} />
    </Modal>
  )
}

export default PhotoModal
