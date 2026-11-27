const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const line_items = items.map((item) => {
      const fullImageUrl = item.image?.startsWith('http')
        ? item.image
        : `https://shop.pavilionventure.com${item.image}`;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [fullImageUrl] : [],
          },
          unit_amount: Math.round(parseFloat(item.price) * 100),
        },
        quantity: item.q || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: {
        allowed_countries: [
          'US', 'CA', 'GB', 'AU', 'NZ', 'IE',
          'AE', 'SA', 'KW', 'QA', 'BH', 'OM'
        ],
      },
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free Tracked International Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 6 },
              maximum: { unit: 'business_day', value: 12 },
            },
          },
        },
      ],
      success_url: 'https://shop.pavilionventure.com/?checkout=success',
      cancel_url: 'https://shop.pavilionventure.com/?checkout=cancel',
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
