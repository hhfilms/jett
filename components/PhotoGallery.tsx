"use client";

import Image from "next/image";
import {useState, useRef, useEffect, MutableRefObject} from "react";
import {urlFor} from "@/sanity/lib/image";
import {useSanityData} from "@/context/SanityDataContext";
import {useKeenSlider, KeenSliderPlugin, KeenSliderInstance} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function ThumbnailPlugin(mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
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
  const {photos} = useSanityData();
  const [featured, setFeatured] = useState(photos[0]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
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
    <div className="w-full max-w-7xl p-8">
      {/* Left: Featured image */}
      <div ref={sliderRef} className="keen-slider mb-4 w-full aspect-[16/9] relative">
        <div className="keen-slider__slide number-slide1 relative w-full h-full">
          <Image src={urlFor(featured.image).width(1200).height(900).url()} alt={featured.caption || "Gallery Image"} fill className="object-cover" sizes="100vw" />
        </div>
      </div>

      {/* Right: Thumbnails */}
      {/* Thumbnails */}
      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {photos.map((photo, idx) => (
          <div key={photo._id} className={`keen-slider__slide number-slide${idx}`} onClick={() => setFeatured(photo)} title={photo.caption}>
            <Image width={500} height={500} src={urlFor(photo.image).width(200).height(200).url()} alt={photo.caption || "Gallery Image"} />
          </div>
        ))}
      </div>
    </div>
  );
}
