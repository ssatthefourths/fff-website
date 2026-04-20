// GET /api/config/public — public runtime config for the SPA.
//
// Anything the client legitimately needs to know (e.g. the Stripe publishable
// key, which is public-by-design) lives here. Serving it from an API means
// we don't have to bake VITE_* vars into the build, and rotating a key is a
// `wrangler pages secret put` away — no rebuild.

interface Env {
  STRIPE_PUBLISHABLE_KEY?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  return Response.json({
    stripePublishableKey: context.env.STRIPE_PUBLISHABLE_KEY ?? null,
  }, {
    headers: {
      // Keys rarely change; cache at the edge for 5 min so every page load
      // doesn't hit the Function.
      'Cache-Control': 'public, max-age=300',
    },
  });
};
