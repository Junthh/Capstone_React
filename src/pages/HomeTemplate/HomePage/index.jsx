import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import MovieList from './MovieList';

import bg1 from '../../../assets/img/bg1.jpg';
import bg2 from '../../../assets/img/bg2.jpg';
import bg3 from '../../../assets/img/bg3.jpg';
import bg4 from '../../../assets/img/bg4.jpg';
import bg5 from '../../../assets/img/bg5.jpg';
import bg6 from '../../../assets/img/bg6.jpg';

export default function HomePage() {
  const images = [bg1, bg2, bg3, bg4, bg5, bg6];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <Carousel
        images={images}
        currentSlide={currentSlide}
        onPrev={handlePrev}
        onNext={handleNext}
        onDotClick={handleDotClick}
      />
      <MovieList />
    </div>
  );
}
