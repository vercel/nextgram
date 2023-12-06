import Frame from '../../../components/frame/Frame'
import type { Photo } from '../../../photos'
import swagPhotos from '../../../photos'

const PhotoPage = ({ params: { id } }: { params: { id: string } }) => {
  const photo: Photo = swagPhotos.find((p) => p.id === id)!

  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto w-1/2 border border-gray-700">
        <Frame photo={photo} />
      </div>
    </div>
  )
}

export default PhotoPage

export const generateStaticParams = () => {
  return swagPhotos.map((photo) => ({ params: { id: photo.id } }))
}
