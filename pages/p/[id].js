import React from "react";
import Photo from "../../components/frame";

export function getStaticProps({ params: { id } }) {
  return { props: { id } };
}

export function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default ({ id }) => (
  <div className="permalink">
    <div className="wrap">
      <Photo id={id} />
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
