import Image from 'next/image';
import React from 'react';

function ExploreCard({ name, title, img, link }) {
  return (
    <div className='flex flex-col m-5 px-4 bg-white z-30  '>
      <h4 className='font-bold text-lg mt-3'>{title}</h4>
      <Image
        src={img[name].src}
        width={200}
        height={200}
        className='object-cover cursor-pointer mx-auto w-[100%] h-[100%] py-3'
        alt={title}
      />
      <p className='text-blue-500 link text-sm py-3'>{link}</p>
    </div>
  );
}

export default ExploreCard;
