import Image from "next/image";
import Link from "next/link";
import { Photo } from "../../photos";

export default function Frame({ photo }: { photo: Photo }) {
  return (
    <>
      <Image
        alt=""
        src={photo.imageSrc}
        height={200}
        width={200}
        className="w-full object-cover aspect-square col-span-2"
      />

      <div className="bg-white p-4 px-6">
        <Link href="/" className="underline uppercase">
          Go to all frames
        </Link>
        <h3>{photo.name}</h3>
        <p>Taken by {photo.username}</p>
      </div>
    </>
  );
}
