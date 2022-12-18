import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { unstable_getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import React from 'react';
import db from '../../firebase';
import moment from 'moment';

function dummy({ stripeOrders }) {
  // console.log(stripeOrders);
  return <div>dummy</div>;
}

export default dummy;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  // console.log('jaseel', session);
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
  // console.log(orders);
  return { props: {} };
}
