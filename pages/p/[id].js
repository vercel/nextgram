import React from 'react';
import Photo from '../../components/frame';
import swagPhotos from '../../photos';

export function getStaticProps({ params: { id } }) {
  const photo = swagPhotos.find((p) => p.id === id);
  return { props: { photo } };
}

export function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export default function PhotoPage({ photo }) {
  return (
    <div className="permalink">
      <div className="wrap">
        <Photo photo={photo} />
      </div>
      <style jsx>{`
        .permalink {
          padding: 100px;
          text-align: center;
        }

        .wrap {
          display: inline-block;
          border: 1px solid #999;
          margin: auto;
        }
      `}</style>
    </div>
  );
}
