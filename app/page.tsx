import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <Link href="/feed">
      <button>Feed</button>
    </Link>
  );
};

export default page;
