import Image from "next/image";
interface PhotoProps {
  photo:
    | {
        id: string;
        name: string;
        href: string;
        username: string;
        imageSrc: string;
      }
    | undefined;
}
export default function Photo({ photo }: PhotoProps) {
  if (!photo) return null;
  return (
    <>
      <Image
        alt=""
        src={photo.imageSrc}
        height={600}
        width={600}
        className="w-full object-cover aspect-square col-span-2"
      />

      <div className="bg-white p-4 px-6">
        <h3>{photo.name}</h3>
        <p>Taken by {photo.username}</p>
      </div>
    </>
  );
}
