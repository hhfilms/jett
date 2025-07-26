import {useSanityData} from "@/context/SanityDataContext";
import React from "react";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useState} from "react";
import {RxOpenInNewWindow} from "react-icons/rx";
import Link from "next/link";

export default function Hudl() {
  const {data} = useSanityData();
  const arrowClasses = "absolute block top-1/2 -translate-y-1/2 cursor-pointer";
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

  function getEmbedUrl(url: string): string {
    try {
      const parsed = new URL(url);
      const parts = parsed.pathname.split("/");
      // Insert "embed" before "video" if not already present
      const videoIndex = parts.indexOf("video");
      if (videoIndex !== -1 && parts[videoIndex - 1] !== "embed") {
        parts.splice(videoIndex, 0, "embed");
      }
      parsed.pathname = parts.join("/");
      return parsed.toString();
    } catch {
      return url;
    }
  }

  return (
    <>
      <div className="w-full relative aspect-video max-w-6xl mx-auto lg:px-4 flex flex-col items-center justify-center">
        <div ref={sliderRef} className="keen-slider mb-4 w-full aspect-square md:aspect-video relative">
          {data.videos ? (
            data.videos.map((video, idx) => (
              <div key={video._id} className="flex flex-col">
                <div className={`keen-slider__slide number-slide${idx} aspect-video relative w-full h-full`}>
                  <iframe className="w-full h-full" src={getEmbedUrl(video.videoUrl)} title={video.caption} frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className=" text-center text-dark">
                  <h2 className="md:text-xl sm:text-lg text-center">{video.caption}</h2>
                </div>
              </div>
            ))
          ) : (
            <div>no vids</div>
          )}
        </div>
        {loaded && instanceRef.current && data.videos.length > 1 && (
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
        <div className="w-full">
          <Link href="https://www.hudl.com/profile/18129509/Jett-Lopez/highlights" target="_blank" className="flex justify-end items-center gap-1 cursor-pointer text-neutral-900 hover:text-secondary">
            view more on <span className="text-orange-500"> hudl</span>
            <RxOpenInNewWindow />
          </Link>
        </div>
      </div>
    </>
  );
}
