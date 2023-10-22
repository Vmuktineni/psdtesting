import React, { useState } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../CSS/HomePage.css';

function Carousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div className="carousel">
      <div className="content">
        <div className="center-content">
          <h1>{slides[currentSlide].heading}</h1>
          <p>{slides[currentSlide].description}</p>
          <div className="btn-container">
            <Link to={slides[currentSlide].buttonLink} className="orange-button">
              {slides[currentSlide].buttonText}
            </Link>
          </div>
        </div>
      </div>
      <div className="arrow arrow-left" onClick={prevSlide}>
        <IoMdArrowDropleftCircle />
      </div>
      <div className="arrow arrow-right" onClick={nextSlide}>
        <IoMdArrowDroprightCircle />
      </div>
      <div className="indicators">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={
              currentSlide === idx
                ? "indicator"
                : "indicator indicator-inactive"
            }
            onClick={() => setCurrentSlide(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
