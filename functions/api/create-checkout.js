JS 图标
create-checkout
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { items } = await request.json();
    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const origin = new URL(request.url).origin;
    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity || 1)), 0);
    // Free shipping for orders RM 100 and above, otherwise RM 8.00
    const shippingAmount = subtotal >= 100 ? 0 : 800;
    const shippingLabel = subtotal >= 100
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
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      return new Response(JSON.stringify({ error: session.error?.message || "Stripe checkout failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
