import Link from "next/link";
import Image from "next/image";
import {useState} from "react";

import {useSanityData} from "@/context/SanityDataContext";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {ChevronLeft, ChevronRight} from "lucide-react";

export default function Articles() {
  const arrowClasses = "absolute block top-1/2 -translate-y-1/2 cursor-pointer";
  const {articles} = useSanityData();
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "free",
    breakpoints: {
      "(min-width: 768px)": {
        slides: {perView: 2, spacing: 15}, // Tailwind `md`
      },
      "(min-width: 1024px)": {
        slides: {perView: 4, spacing: 15}, // Tailwind `lg` and up
      },
    },
    slides: {
      perView: 1,
      spacing: 15,
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <main className="container lg:px-4 py-8">
      <div ref={sliderRef} className="keen-slider relative">
        {articles.map((article, idx) => (
          <div key={article._id} className={`keen-slider__slide number-slide${idx} bg-white md:rounded overflow-hidden shadow-lg`}>
            <div className="relative w-full h-52">
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover" unoptimized />
              <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>

            <div className="p-4">
              <Link href={article.url} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-bold text-gray-900 hover:underline">{article.title}</h2>
              </Link>
            </div>
          </div>
        ))}
        {loaded && instanceRef.current && instanceRef.current.track?.details && (
          <>
            <ChevronLeft
              className={`${arrowClasses} left-0 text-primary`}
              strokeWidth={2}
              size={36}
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
            />
            <ChevronRight
              className={`${arrowClasses} right-0 text-primary`}
              strokeWidth={2}
              size={36}
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
            />
          </>
        )}
      </div>
    </main>
  );
}
