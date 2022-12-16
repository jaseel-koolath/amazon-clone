import Image from 'next/image';
import React from 'react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/*Top Nav*/}
      <div className='flex items-center bg-amazon_blue p-1 py-2 flex-grow'>
        <div
          className='m-2 flex items-center flex-grow sm:flex-grow-0 '
          onClick={() => {
            router.push('/');
          }}
        >
          <Image
            src='https://pngimg.com/uploads/amazon/amazon_PNG25.png'
            alt='amzon logo'
            width={120}
            height={30}
            className='object-contain link'
          />
        </div>
        {/* Search */}
        <div className='hidden sm:flex hover:bg-amazon_yellow-600 bg-amazon_yellow-400 items-center h-10 rounded-md flex-grow cursor-pointer'>
          <input
            type='text'
            className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md outline-none px-4'
          />
          <MagnifyingGlassIcon className='h-12 p-4' />
        </div>
        {/* Right */}
        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div className='link' onClick={!session ? signIn : signOut}>
            <p>{session ? `${session.user.name}` : 'Sign In'}</p>
            <p className='font-bold'>Account and Lists</p>
          </div>
          <div className='hidden sm:block link'>
            <p>Returns</p>
            <p className=' font-bold'>& Orders</p>
          </div>
          <div
            onClick={() => {
              router.push('/checkout');
            }}
            className='link flex relative items-center'
          >
            <ShoppingCartIcon className='h-10' />
            <p className='hidden md:inline mt-2 text-sm font-bold'>Basket</p>
            <div className='absolute w-4 h-4 rounded-full text-center text-black font-bold -top-1 left-7 bg-amazon_yellow-400'>
              <p>{items.length}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Nav */}
      <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-2 p-2'>
        <p className='flex items-center link'>
          <Bars3Icon className='h-6 mr-1' />
          All
        </p>
        <p className='link'>Prime</p>
        <p className='link'>Sell</p>
        <p className='link'>Best Sellers</p>
        <p className='link'>Mobiles</p>
        <p className='link hidden sm:inline-flex'>Fashion</p>
        <p className='link hidden sm:inline-flex'>Books</p>
        <p className='link hidden lg:inline-flex'>Todays Deals</p>
        <p className='link hidden xl:inline-flex'>Customer Service</p>
        <p className='link hidden md:inline-flex'>Electronics</p>
        <p className='link hidden xl:inline-flex'>Amazon miniTV</p>
        <p className='link hidden xl:inline-flex'>Home & Kitchen</p>
        <p className='link hidden lg:inline-flex'>New Releases</p>
        <p className='link hidden lg:inline-flex'>Amazon Pay</p>
        <p className='link hidden sm:inline-flex'>Computers</p>
      </div>
    </header>
  );
};

export default Header;
