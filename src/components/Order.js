import React from 'react';
import moment from 'moment';

function Order({ id, amount, amounnt_shipping, images, timestamp, items }) {
  return (
    <div className='relative border rounded-md'>
      <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
        <div>
          <p className='font-bold text-xs'>Date</p>
          <p>{moment.unix(timestamp).format('DD MMM YYYY')}</p>
        </div>
        <div>
          <p className='text-xs font-bold'>TOTAL</p>
          <p className='font-bold text-base'>
            <span className=' text-sm text-[20px] leading-[25px] mr-[3px] '>
              <sup>₹</sup>
            </span>
            {Math.floor(amount).toLocaleString('en-US')}
            <span>
              <sup className='ml-[3px] text-xs'>
                {String((amount * 100) % 100).padEnd(2, '0')}
              </sup>
            </span>
          </p>
        </div>
        <p className='text-sm whitespace-nowrap sm:text-lg self-end flex-1 text-right text-blue-500'>
          {items.length} Items
        </p>
        <p className='hidden sm:flex absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap '>
          ORDER#: {id}
        </p>
      </div>
      <div className='p-5 sm:p-10'>
        <div className='flex space-x-6 overflow-x-auto'>
          {images.map((img, index) => (
            <img
              key={`${img}${index}`}
              src={img}
              alt='item'
              className='h-20 sm:h-32 object-contain'
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
