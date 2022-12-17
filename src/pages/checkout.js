import Image from 'next/image';
import React from 'react';
import Header from '../components/Header';
import checkoutP from '../assets/checkout_poster.png';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const total = useSelector(selectTotal);
  const createCheckout = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session.user.email,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
  };

  return (
    <div>
      <Header />
      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src={checkoutP}
            alt='poster'
            height={250}
            width={1020}
            className='object-contain'
          />
          <div className='flex flex-col space-y-10 p-5 mt-5 bg-white'>
            <h1 className='text-xl md:text-3xl border-b pb-4'>
              {items.length === 0
                ? 'Your Basket is Empty'
                : 'Your shopping basket'}
            </h1>
            {items.map((item) => (
              <CheckoutProduct key={item.id} {...item} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className='flex flex-col m-5 bg-white p-5 min-w-[300px]'>
          <p>total: </p>
          <p className='font-bold text-2xl mb-5'>
            <span className=' text-sm text-[20px] leading-[25px] mr-[3px] '>
              <sup>₹</sup>
            </span>
            {Math.floor(total).toLocaleString('en-US')}
            <span>
              <sup className='ml-[3px] text-sm'>
                {String((total * 100) % 100).padEnd(2, '0')}
              </sup>
            </span>
          </p>
          <button
            role='link'
            disabled={!session}
            onClick={() => createCheckout()}
            className={`button ${
              (!session || total <= 0) &&
              'bg-gradient-to-b from-gray-200 to-gray-400 border-gray-300 focus:ring-2 focus:ring-gray-500 active:from-gray-500 cursor-not-allowed'
            }`}
          >
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
