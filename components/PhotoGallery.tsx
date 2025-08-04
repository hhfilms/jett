import React from "react";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import {useSanityData} from "@/context/SanityDataContext";
import {useState} from "react";
import {useKeenSlider} from "keen-slider/react";
import {KeenSliderInstance} from "keen-slider";
import "keen-slider/keen-slider.min.css";
import SliderArrows from "@/components/SliderArrows";

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
        <SliderArrows
          className="top-1/3"
          onPrev={() => instanceRef.current?.prev()}
          onNext={() => instanceRef.current?.next()}
          currentSlide={currentSlide}
          totalSlides={instanceRef.current?.track.details.slides.length || 0}
        />
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
