import React from "react";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useEffect, useState} from "react";
import {BiLoaderCircle} from "react-icons/bi";

type Video = {
  id: string;
  title: string;
  tags: string[];
};

export default function VideoGallery() {
  const arrowClasses = "absolute block top-1/2 -translate-y-1/2 cursor-pointer";
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details?.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const fetchVideos = async (retries = 3) => {
      try {
        setFetching(true);
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data);
      } catch (err: unknown) {
        if (retries > 0) {
          setTimeout(() => fetchVideos(retries - 1), 1000);
        } else {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Something went wrong");
          }
        }
      } finally {
        setFetching(false);
      }
    };

    fetchVideos();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return fetching ? (
    <div className="flex flex-row items-center justify-center text-primary">
      <BiLoaderCircle className="text-7xl animate-spin" />
    </div>
  ) : (
    <div className="w-full relative aspect-video max-w-6xl mx-auto lg:px-4 flex flex-row items-center justify-center">
      <div ref={sliderRef} className="keen-slider mb-4 w-full aspect-square md:aspect-video relative">
        {videos ? (
          videos.map((video, idx) => (
            <div key={video.title} className="flex flex-col">
              <div className={`keen-slider__slide number-slide${idx} aspect-video relative w-full h-full`}>
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen></iframe>
              </div>
              <div className=" text-center text-dark">
                <h2 className="md:text-xl sm:text-lg text-center">{video.title}</h2>
              </div>
            </div>
          ))
        ) : (
          <div>no vids</div>
        )}
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
    </div>
  );
}
