import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import db from '../../firebase';
import Header from '../components/Header';
import moment from 'moment';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';

function Orders({ orders }) {
  console.log(orders);
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <main className='max-w-screen-lg mx-auto p-10 bg-white '>
        <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
          Your Orders
        </h1>
        {session ? (
          <h2>x orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className='mt-5 space-y-4'></div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // get the users logged in cred
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) return { props: {} };
  // Orders from firebase db
  const stripeOrdersRef = collection(db, `users/${session.user.email}/orders`);
  const q = query(stripeOrdersRef, orderBy('timestamp', 'desc'));
  const stripeOrders = await getDocs(q);

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amount_shipping: order.data().amounnt_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return { props: { orders } };
}
