"use client";

import Image from "next/image";
import {useState, useRef, useEffect} from "react";
import {urlFor} from "@/sanity/lib/image";
import {useSanityData} from "@/context/SanityDataContext";

export default function PhotoGallery() {
  const {photos} = useSanityData();
  const [featured, setFeatured] = useState(photos[0]);

  const featuredRef = useRef<HTMLDivElement | null>(null);
  const [thumbHeight, setThumbHeight] = useState<number | null>(null);

  useEffect(() => {
    if (featuredRef.current) {
      setThumbHeight(featuredRef.current.offsetHeight);
    }
  }, [featured]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 w-full">
      {/* Left: Featured image */}
      <div ref={featuredRef} className="w-full md:w-1/2 aspect-[4/3] relative rounded overflow-hidden">
        <Image fill className="object-cover" src={urlFor(featured.image).width(800).height(600).url()} alt={featured.caption || "Gallery Image"} />
      </div>

      {/* Right: Thumbnails */}
      <div className="w-full md:w-1/2 overflow-y-scroll overflow-x-hidden scrollbar-hide" style={{height: thumbHeight || undefined}}>
        <div className="flex flex-wrap justify-between gap-2">
          {photos.map((photo) => (
            <div key={photo._id} className="relative h-52 w-full sm:w-[48%] md:w-[23%] rounded-lg overflow-hidden cursor-pointer" onClick={() => setFeatured(photo)} title={photo.caption}>
              <Image src={urlFor(photo.image).width(200).height(200).url()} alt={photo.caption || "Gallery Image"} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
