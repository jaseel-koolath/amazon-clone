import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import primeIcon from '../assets/prime_icon.png';

function Product({
  id,
  title,
  price,
  description,
  category,
  image,
  rating: { rate, count },
}) {
  const [hasPrime, setPrime] = useState(false);
  useEffect(() => {
    setPrime(Math.random() < 0.5);
    return () => {};
  }, []);
  price = price * 60;
  return (
    <div className='relative flex flex-col m-5 bg-white z-30  p-10'>
      <p className='absolute top-2 right-2 text-gray-400 text-xs italic'>
        {category}
      </p>
      <Image
        src={image}
        width={200}
        height={200}
        className='object-contain h-[200px] w-[200px] mx-auto'
        alt={title}
      />
      <h4 className='my-3'>{title}</h4>
      <div className='flex items-center'>
        <div className='flex mr-2'>
          {[...Array(Math.floor(rate))].map((i, j) => (
            <StarIcon key={j} className='h-4 w-4 text-amazon_yellow-400' />
          ))}
          {[...Array(5 - Math.floor(rate))].map((i, j) => (
            <StarOutline key={j} className='h-4 w-4 text-amazon_yellow-400' />
          ))}
        </div>
        <p className='text-xs text-gray-600'>{count}</p>
      </div>
      <p className='text-xs my-2 line-clamp-2'>{description}</p>
      <p className='font-bold text-2xl mb-5'>
        <span className=' text-sm text-[20px] leading-[25px] mr-[3px] '>
          <sup>₹</sup>
        </span>
        {Math.floor(price).toLocaleString('en-US')}
        <span>
          <sup className='ml-[3px] text-sm'>
            {String((price * 100) % 100).padEnd(2, '0')}
          </sup>
        </span>
      </p>

      {hasPrime && (
        <div className='flex space-x-2 items-center -mt-5 mb-3'>
          <img src={primeIcon.src} alt='' className='h-4' />
          <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
        </div>
      )}
      <button className='mt-auto button'>Add to Basket</button>
    </div>
  );
}

export default Product;
