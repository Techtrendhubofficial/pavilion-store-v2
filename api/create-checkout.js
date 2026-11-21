export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body || {};
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const host = req.headers.host || "shop.pavilionventure.com";
    const origin = `https://${host}`;
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
      0
    );

    // 满 RM 100 免邮，否则 RM 8.00
    const shippingAmount = subtotal >= 100 ? 0 : 800;
    const shippingLabel =
      subtotal >= 100
        ? "Free Standard Shipping (Malaysia - Orders RM 100+)"
        : "Standard Shipping (Malaysia)";

    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("success_url", `${origin}/my/?payment=success`);
    params.append("cancel_url", `${origin}/my/?payment=cancel`);
    params.append("shipping_address_collection[allowed_countries][0]", "MY");
    params.append("phone_number_collection[enabled]", "true");

    params.append("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    params.append("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(shippingAmount));
    params.append("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "myr");
    params.append("shipping_options[0][shipping_rate_data][display_name]", shippingLabel);

    items.forEach((item, index) => {
      params.append(`line_items[${index}][price_data][currency]`, "myr");
      params.append(`line_items[${index}][price_data][product_data][name]`, item.title);
      if (item.image && item.image.startsWith("https://")) {
        params.append(`line_items[${index}][price_data][product_data][images][0]`, item.image);
      }
      params.append(`line_items[${index}][price_data][unit_amount]`, String(Math.round(Number(item.price) * 100)));
      params.append(`line_items[${index}][quantity]`, String(item.quantity || 1));
    });

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      return res.status(400).json({ error: session.error?.message || "Stripe checkout failed" });
    }

    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
