interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { customer_name, customer_email, items } = await context.request.json() as {
    customer_name: string;
    customer_email: string;
    items: { product_id: number; price: number }[];
  };

  if (!customer_name || !customer_email || !items?.length) {
    return Response.json({ error: 'Name, email, and items are required' }, { status: 400 });
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  try {
    const orderResult = await context.env.DB.prepare(
      'INSERT INTO orders (customer_name, customer_email, total, status) VALUES (?, ?, ?, ?)'
    ).bind(customer_name, customer_email, total, 'pending').run();

    const orderId = orderResult.meta.last_row_id;

    for (const item of items) {
      await context.env.DB.prepare(
        'INSERT INTO order_items (order_id, product_id, price) VALUES (?, ?, ?)'
      ).bind(orderId, item.product_id, item.price).run();
    }

    return Response.json({
      success: true,
      order: { id: orderId, total, status: 'pending' },
    });
  } catch (err: any) {
    return Response.json({ error: 'Failed to create order', detail: err.message }, { status: 500 });
  }
};
