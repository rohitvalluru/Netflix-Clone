import React from 'react';
import Card from './Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CardSlider = ({ data, title }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div>
      {/* Title section with a black background */}
      <div className="bg-black py-3">
        <h1 className="text-3xl text-white font-bold px-5">{title}</h1>
      </div>

      {/* Carousel section */}
      <Carousel responsive={responsive} partialVisible={true} className="bg-black">
        {data.map((movie) => (
          <div
            key={movie.id}
            className="group relative flex flex-col mb-30 mt-2 mb-5 px-3 gap-10 transition duration-300 ease-in-out transform-gpu hover:scale-110"
          >
            <Card movieData={movie} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CardSlider;



