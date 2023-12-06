import Image from 'next/image'
import type { Photo } from '../../photos'

const Frame = ({ photo }: { photo: Photo }) => {
  return (
    <>
      <Image
        alt=""
        src={photo.imageSrc}
        height={600}
        width={600}
        className="col-span-2 aspect-square w-full object-cover"
      />

      <div className="bg-white p-4 px-6">
        <h3>{photo.name}</h3>
        <p>Taken by {photo.username}</p>
      </div>
    </>
  )
}

export default Frame
