interface Env {
  DB: D1Database;
  STRIPE_SECRET_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { customer_name, customer_email, items } = await context.request.json() as {
    customer_name: string;
    customer_email: string;
    items: { product_id: number; name: string; price: number }[];
  };

  if (!customer_name || !customer_email || !items?.length) {
    return Response.json({ error: 'Name, email, and items required' }, { status: 400 });
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  // Create order in D1
  const orderResult = await context.env.DB.prepare(
    'INSERT INTO orders (customer_name, customer_email, total, status) VALUES (?, ?, ?, ?)'
  ).bind(customer_name, customer_email, total, 'completed').run();

  const orderId = orderResult.meta.last_row_id;

  for (const item of items) {
    await context.env.DB.prepare(
      'INSERT INTO order_items (order_id, product_id, price) VALUES (?, ?, ?)'
    ).bind(orderId, item.product_id, item.price).run();
  }

  // TODO: When STRIPE_SECRET_KEY is set, create a real Stripe checkout session
  // For now, return success with order details (mock payment)
  if (context.env.STRIPE_SECRET_KEY) {
    // Future: Create Stripe checkout session
    // const stripe = new Stripe(context.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({...});
    // return Response.json({ success: true, checkout_url: session.url, order_id: orderId });
  }

  return Response.json({
    success: true,
    order_id: orderId,
    total,
    message: 'Order placed successfully! Download links will be sent to your email.',
    items: items.map(i => i.name),
  });
};
