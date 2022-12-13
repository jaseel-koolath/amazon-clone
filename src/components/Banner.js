import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { carouselItems } from '../assets';

const Banner = () => {
  return (
    <div className='relative'>
      <div className='absolute h-[30%] z-20 bg-gradient-to-t from-[#eaeded] to-transparent bottom-0 w-full'></div>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={5000}
      >
        {carouselItems.map((item, index) => (
          <div key={index}>
            <img loading='lazy' src={item.src} alt={`carousel- ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
