import Image from 'next/image';
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import {
  StarIcon as StarOutline,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import primeIcon from '../assets/prime_icon.png';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating: { rate, count },
}) {
  const dispatch = useDispatch();

  const add = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating: { rate, count },
    };
    dispatch(addToBasket(product));
  };
  const remove = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className='grid grid-cols-5'>
      {/* Left Image */}
      <Image
        src={image}
        height={150}
        width={150}
        alt={title}
        className='object-contain mx-auto'
      />
      {/* Middle Details */}
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
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
        <p className='text-xs xl:text-sm my-2 line-clamp-3'>{description}</p>
        <p className='font-bold text-xl mb-5'>
          <span className=' text-xs text-[20px] leading-[25px] mr-[3px] '>
            <sup>₹</sup>
          </span>
          {Math.floor(price).toLocaleString('en-US')}
          <span>
            <sup className='ml-[3px] text-xs'>
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
      </div>
      {/* Right Buttons  */}
      <div className='flex flex-col space-y-2 p-2'>
        <button className='button' onClick={add}>
          <PlusIcon className='w-4 h-4 mx-auto inline' />
          <span className='hidden sm:inline'>{'  Add'}</span>
        </button>
        <button className='button' onClick={remove}>
          <TrashIcon className='w-4 h-4 mx-auto inline' />
          <span className='hidden sm:inline'>{' Delete'}</span>
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
