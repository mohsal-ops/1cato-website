import Stripe from "stripe";

// Lazily instantiate the Stripe client. Instantiating at module top level makes
// `new Stripe(undefined)` run while Next.js "collects page data" during the
// Vercel build — where STRIPE_SECRET_KEY isn't present — which throws
// "Neither apiKey nor config.authenticator provided" and fails the build.
// Reading the key only when a request actually runs avoids that.
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    client = new Stripe(key);
  }
  return client;
}
