export default function Carousel({ images, currentSlide, onPrev, onNext, onDotClick }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(calc(-${currentSlide * 80}% + 10%))`,
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-[80%] mx-2 transition-transform duration-500 ${
              index === currentSlide ? "scale-100" : "scale-90 opacity-70"
            }`}
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-lg object-contain"
            />
          </div>
        ))}
      </div>
      <button
        onClick={onPrev}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-10"
      >
        ❮
      </button>
      <button
        onClick={onNext}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-10"
      >
        ❯
      </button>

      <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
