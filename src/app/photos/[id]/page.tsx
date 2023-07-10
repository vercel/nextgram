import Frame from '../../../components/frame/Frame'
import swagPhotos, { Photo } from '../../../photos'

export default function PhotoPage({ params: { id } }: { params: { id: string } }) {
  const photo: Photo = swagPhotos.find((p) => p.id === id)!

  return (
    <div className="container mx-auto my-10 w-full sm:w-5/6 md:w-4/6 lg:w-3/5 xl:w-3/6 2xl:w-2/5 px-4">
      <div className="mx-auto  border border-gray-700">
        <Frame photo={photo} />
      </div>
    </div>
  )
}
