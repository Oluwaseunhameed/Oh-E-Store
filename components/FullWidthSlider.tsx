import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Slide {
  id: number;
  image: string;
}

interface FullWidthSliderProps {
  slides: Slide[];
}

const FullWidthSlider: React.FC<FullWidthSliderProps> = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <img
            src={slide.image}
            alt={`Slide ${slide.id}`}
            className="w-full h-500"
          />
        </div>
      ))}
    </Slider>
  );
};

export default FullWidthSlider;
