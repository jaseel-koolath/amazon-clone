import { buffer } from 'micro';
import * as admin from 'firebase-admin';

//Secure a connection to the firebase from the backend;

const serviceAccout = require('../../../permissions.json');
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccout),
    })
  : admin.app();

//Establish a connection to the stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log('Fulfilling Order', session);
  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amounnt_shipping: 0,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Order ${session.id} has added to the database`);
    });
};

const webhook = async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;
    //verify that the event posted came from stripe webhook
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log('ERROR!', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle checkout session completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      //fulfill the order
      fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export default webhook;
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
