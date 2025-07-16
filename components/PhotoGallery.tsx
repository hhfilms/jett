import React from "react";
import Image from "next/image";

import {urlFor} from "@/sanity/lib/image";
import {useSanityData} from "@/context/SanityDataContext";
import {useState} from "react";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {ChevronLeft, ChevronRight} from "lucide-react";

function ThumbnailPlugin(mainRef: any) {
  return (slider: any) => {
    function removeActive() {
      slider.slides.forEach((slide: any) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: any) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide: any, idx: any) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main: any) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function PhotoGallery() {
  const arrowClasses = "absolute block top-1/3 bg-gray-50 -translate-y-1/2 cursor-pointer";
  const {photos} = useSanityData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="w-full max-w-5xl py-2 px-12 mb-22 relative">
      <div ref={sliderRef} className="keen-slider mb-4 w-full aspect-square md:aspect-video relative">
        {photos.map((photo, idx) => (
          <div key={photo._id} className={`keen-slider__slide number-slide${idx} relative w-full h-full`} title={photo.caption}>
            <Image fill quality={100} className="object-contain object-center" src={urlFor(photo.image).width(1000).height(1000).url()} alt={photo.caption || "Gallery Image"} />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <ChevronLeft
            className={`${arrowClasses} left-12  ${currentSlide === 0 ? "text-gray-200" : "text-primary"}`}
            strokeWidth={2}
            size={36}
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
          />
          <ChevronRight
            className={`${arrowClasses} right-12  ${currentSlide === instanceRef.current.track.details.slides.length - 1 ? "text-gray-200" : "text-primary"}`}
            strokeWidth={2}
            size={36}
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
          />
        </>
      )}

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {photos.map((photo, idx) => (
          <div key={photo._id} className={`keen-slider__slide number-slide${idx}`} title={photo.caption}>
            <Image width={500} height={500} src={urlFor(photo.image).width(200).height(200).url()} alt={photo.caption || "Gallery Image"} />
          </div>
        ))}
      </div>
    </div>
  );
}
