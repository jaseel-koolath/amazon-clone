import Image from 'next/image';
import React from 'react';
import Product from './Product';
import { exploreData } from '../assets';
import ExploreCard from './ExploreCard';
import poster from '../assets/poster.gif';

function ProuductsFeed({ products, electronics, jewelery }) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-48 mx-auto'>
      {/* First 4 Products */}
      {products.slice(0, 4).map((product) => (
        <Product key={product.id} {...product} />
      ))}
      {/* Explore Cards first 3 */}
      {exploreData.slice(0, 2).map((data) => (
        <ExploreCard key={data.title} {...data} />
      ))}
      {/* Best of Electronics */}
      <div className='md:col-span-full bg-white m-5 h-[350px]'>
        <h2 className='m-5 text-2xl font-bold'>Best Sellers in Electronics</h2>
        <div className='flex h-[200px] mx-auto'>
          {electronics.map((product, index) => (
            <Image
              key={product.id}
              src={product.image}
              width={200}
              height={200}
              className={`cursor-pointer object-contain h-[100%] w-[100%] max-w-[200px] m-5 overflow-x-scroll ${
                index === 1 && 'hidden lg:flex'
              } ${index > 3 && 'hidden md:flex'} `}
              alt={product.title}
            />
          ))}
        </div>
      </div>
      {/* The one with taking 2 spaces */}
      <div className='md:col-span-2'>
        {products.slice(4, 5).map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>

      {/* Explore Cards remaining 2 */}
      {exploreData.slice(3).map((data) => (
        <ExploreCard key={data.title} {...data} />
      ))}
      {/* Poster */}
      <div className='md:col-span-full bg-white m-5'>
        <Image
          src={poster}
          width={300}
          height={300}
          className={`cursor-pointer object-contain h-[100%] w-[100%] `}
          alt='poster'
        />
      </div>
      {/* Best of Jewelery */}
      <div className='md:col-span-3 bg-white m-5 '>
        <h2 className='m-5 text-2xl font-bold'>Best Sellers in Jewelery</h2>
        <div className='flex h-[200px] mx-auto justify-center items-stretch'>
          {jewelery.map((product, index) => (
            <Image
              key={product.id}
              src={product.image}
              width={200}
              height={200}
              className={` object-contain h-[100%] w-[100%] max-w-[200px] m-5 overflow-x-scroll cursor-pointer  ${
                index > 3 && 'hidden md:flex'
              } `}
              alt={product.title}
            />
          ))}
        </div>
      </div>
      {/* Remaining Products */}
      {products.slice(5).map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProuductsFeed;
