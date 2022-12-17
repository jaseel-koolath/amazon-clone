const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  const { items, email } = req.body;
  // console.log(items, email);
  const stripeItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: 'INR',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // shipping_rates: ['shr_1MFzFbSD27bQ9aGq2ai3C85A'],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'inr' },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA', 'IN'],
    },
    line_items: stripeItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  res.status(200).json({ id: session.id });
};

export default handler;
