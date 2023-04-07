import React from "react";
import Photo from "../../../components/frame";
import swagPhotos from "../../../photos";
import { permalink, wrap } from "./styles.module.css";

export default function PhotoPage({ params: { id } }) {
  const photo = swagPhotos.find((p) => p.id === id);

  return (
    <div className={permalink}>
      <div className={wrap}>
        <Photo photo={photo} />
      </div>
    </div>
  );
}
