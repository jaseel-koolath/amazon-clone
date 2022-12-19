import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../components/Header';

function Success() {
  const router = useRouter();
  return (
    <div className='h-screen'>
      <Header />
      <main className='max-w-screen-lg m-auto'>
        <div className='flex flex-col p-10 bg-white'>
          <div className='flex items-center space-x-2 mb-5 '>
            <CheckCircleIcon className='text-green-500 h-10' />
            <h1 className='text-3xl'>
              Thank you, your order has been confirmed
            </h1>
          </div>
          <p>
            Your order will be processed and shipped as soon as possible. If you
            have any questions or concerns about your order, please do not
            hesitate to contact us. Thank you again for choosing us. We hope to
            see you again soon.
          </p>
          <button
            className='button mt-8'
            onClick={() => {
              router.push('/orders');
            }}
          >
            My orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default Success;
