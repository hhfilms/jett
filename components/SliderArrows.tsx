import {ChevronLeft, ChevronRight} from "lucide-react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  currentSlide: number;
  totalSlides: number;
};

export default function SliderArrows({onPrev, onNext, currentSlide, totalSlides, className = ""}: Props & {className?: string}) {
  const arrowClasses = `absolute block -translate-y-1/2 cursor-pointer bg-neutral-50/50 ${className}`;

  return (
    <>
      <ChevronLeft
        className={`${arrowClasses} left-0 ${currentSlide === 0 ? "text-gray-200" : "text-secondary"}`}
        strokeWidth={2}
        size={36}
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      />
      <ChevronRight
        className={`${arrowClasses} right-0 ${currentSlide === totalSlides - 1 ? "text-gray-200" : "text-secondary"}`}
        strokeWidth={2}
        size={36}
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      />
    </>
  );
}
