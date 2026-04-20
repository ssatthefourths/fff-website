// Stripe client factory for Pages Functions.
//
// Workers run in V8 isolates — they don't have the Node `http` / `crypto`
// modules that stripe-node uses by default. The SDK provides two hooks for
// this environment:
//   * createFetchHttpClient — routes API calls through fetch()
//   * createSubtleCryptoProvider — webhook signature verification via
//     Web Crypto (used inside constructEventAsync below)

import Stripe from 'stripe';

export function getStripe(secretKey: string): Stripe {
  return new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
    // Let the SDK use its bundled default API version so this keeps working
    // after SDK upgrades. Pin explicitly if account-level webhook reliability
    // becomes an issue.
  });
}

export function getCryptoProvider() {
  return Stripe.createSubtleCryptoProvider();
}
