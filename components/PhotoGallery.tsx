"use client";

import Image from "next/image";
import {useState} from "react";
import {urlFor} from "@/sanity/lib/image";
import {useSanityData} from "@/context/SanityDataContext";

export default function PhotoGallery() {
  const {photos} = useSanityData();
  const [featured, setFeatured] = useState(photos[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 w-full">
      {/* Left: Featured image */}
      <div className="w-full md:w-1/2 aspect-[4/3] relative rounded overflow-hidden ">
        <Image fill className="object-cover" src={urlFor(featured.image).width(800).height(600).url()} alt={featured.caption || "Gallery Image"} />
      </div>

      {/* Right: Thumbnails */}
      <div className="w-full md:w-1/2">
        <div className="flex flex-row gap-2">
          {photos.map((photo) => (
            <div key={photo._id} className="flex items-center justify-center relative w-full h-52 rounded-lg overflow-hidden" onClick={() => setFeatured(photo)} title={photo.caption}>
              <Image src={urlFor(photo.image).width(200).height(200).url()} alt={photo.caption || "Gallery Image"} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
