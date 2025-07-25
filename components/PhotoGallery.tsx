import React from "react";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import {useSanityData} from "@/context/SanityDataContext";
import {useState} from "react";
import {useKeenSlider} from "keen-slider/react";
import {KeenSliderInstance} from "keen-slider";
import "keen-slider/keen-slider.min.css";
import {ChevronLeft, ChevronRight} from "lucide-react";

function ThumbnailPlugin(mainRef: React.RefObject<KeenSliderInstance | null>) {
  return (slider: KeenSliderInstance) => {
    function removeActive() {
      slider.slides.forEach((slide: HTMLElement) => {
        slide?.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx]?.classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide: HTMLElement, idx: number) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details?.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main: KeenSliderInstance) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function PhotoGallery() {
  const arrowClasses = "absolute block top-1/3 -translate-y-1/2 cursor-pointer";
  const {data} = useSanityData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details?.rel);
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
    <div className="w-full max-w-5xl py-2 mb-22 relative">
      <div ref={sliderRef} className="keen-slider mb-4 w-full aspect-square md:aspect-video relative">
        {data.photos.map((photo, idx) => (
          <div key={photo._id} className={`keen-slider__slide number-slide${idx} relative w-full h-full`} title={photo.caption}>
            <Image
              fill
              sizes="(min-width: 1024px) 800px, (min-width: 768px) 600px, 100vw"
              quality={100}
              className="object-contain object-center"
              src={urlFor(photo.image).width(1000).height(1000).url()}
              alt={photo.caption || "Gallery Image"}
            />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <ChevronLeft
            className={`${arrowClasses} left-0 lg:left-12  ${currentSlide === 0 ? "text-gray-200" : "text-primary"}`}
            strokeWidth={2}
            size={36}
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
          />
          <ChevronRight
            className={`${arrowClasses} right-0 lg:right-12  ${currentSlide === instanceRef.current.track.details?.slides.length - 1 ? "text-gray-200" : "text-primary"}`}
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
        {data.photos.map((photo, idx) => (
          <div key={photo._id} className={`keen-slider__slide number-slide${idx}`} title={photo.caption}>
            <Image width={500} height={500} src={urlFor(photo.image).width(200).height(200).url()} alt={photo.caption || "Gallery Image"} />
          </div>
        ))}
      </div>
    </div>
  );
}
