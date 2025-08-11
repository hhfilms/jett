import {useSanityData} from "@/context/SanityDataContext";
import React from "react";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {useState} from "react";
import {RxOpenInNewWindow} from "react-icons/rx";
import Link from "next/link";
import SliderArrows from "@/components/SliderArrows";

export default function Hudl() {
  const {data} = useSanityData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slides: { perView: 1, spacing: 8 },
      renderMode: "performance",
      rubberband: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details?.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        if (typeof window === "undefined" || !('ResizeObserver' in window)) return;
        const ro = new ResizeObserver(() => slider.update());
        ro.observe(slider.container);
        slider.on("destroyed", () => ro.disconnect());
      },
    ]
  );

  React.useEffect(() => {
    if (!instanceRef.current) return;
    // Update layout on the next frame after videos change
    const id = requestAnimationFrame(() => instanceRef.current?.update());
    return () => cancelAnimationFrame(id);
  }, [data.videos?.length]);

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
    <main className="w-full max-w-6xl relative mx-auto">
      <div ref={sliderRef} className="keen-slider mb-4 w-full aspect-video relative">
        {data.videos && data.videos.length > 0 ? (
          data.videos.map((video) => (
            <div key={video._id} className="keen-slider__slide flex flex-col">
              <div className="aspect-video relative w-full h-full">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={getEmbedUrl(video.videoUrl)}
                  title={video.caption}
                  frameBorder="0"
                  allowFullScreen
                  onLoad={() => instanceRef.current?.update()}
                />
              </div>
              <div className="text-center text-dark">
                <h2 className="md:text-xl sm:text-lg text-center">{video.caption}</h2>
              </div>
            </div>
          ))
        ) : (
          <div className="keen-slider__slide flex items-center justify-center">no vids</div>
        )}
      </div>
      {loaded && instanceRef.current && data.videos.length > 1 && (
        <SliderArrows
          className="top-1/2"
          onPrev={() => instanceRef.current?.prev()}
          onNext={() => instanceRef.current?.next()}
          currentSlide={currentSlide}
          totalSlides={instanceRef.current?.track.details?.slides.length || 0}
        />
      )}
      <div className="w-full">
        <Link href="https://www.hudl.com/profile/18129509/Jett-Lopez/highlights" target="_blank" className="flex justify-end items-center gap-1 cursor-pointer text-neutral-900 hover:text-secondary">
          view more on <span className="text-orange-500"> hudl</span>
          <RxOpenInNewWindow />
        </Link>
      </div>
    </main>
  );
}
