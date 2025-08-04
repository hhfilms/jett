import Link from "next/link";
import Image from "next/image";
import {useState} from "react";

import {useSanityData} from "@/context/SanityDataContext";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import SliderArrows from "@/components/SliderArrows";

export default function Articles() {
  const {data} = useSanityData();
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: false,
    mode: "snap",
    breakpoints: {
      "(min-width: 768px)": {
        slides: {perView: 3, spacing: 15}, // Tailwind `md`
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
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <main className="w-full max-w-6xl py-2 mb-22 relative">
      <p>Length: {data.articles.length}</p>
      <div ref={sliderRef} className="keen-slider relative">
        {data.articles.map((article, idx) => (
          <article key={article._id} className={`keen-slider__slide number-slide${idx} bg-white md:rounded overflow-hidden shadow-lg`}>
            <div className="relative w-full h-52">
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover" unoptimized />
              <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>

            <div className="p-4">
              <Link href={article.url} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-bold text-gray-900 hover:underline">{article.title}</h2>
              </Link>
            </div>
          </article>
        ))}
        {loaded && instanceRef.current && instanceRef.current.track?.details && (
          <SliderArrows
            className="top-1/2"
            onPrev={() => instanceRef.current?.prev()}
            onNext={() => instanceRef.current?.next()}
            currentSlide={currentSlide}
            totalSlides={instanceRef.current?.track.details.slides.length || 0}
          />
        )}
      </div>
    </main>
  );
}
