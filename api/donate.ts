import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Donation order creation endpoint.
 *
 * Razorpay integration:
 *  1. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env
 *  2. npm install razorpay
 *  3. Uncomment the Razorpay code below
 *
 * Stripe integration (alternative):
 *  1. Set STRIPE_SECRET_KEY in .env
 *  2. npm install stripe
 *  3. Use Stripe PaymentIntent API instead
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Security Headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount, frequency, recaptchaToken } = req.body || {};

  // ── BOT PROTECTION (reCAPTCHA) ─────────────────────────────────────────────
  /*
  if (!recaptchaToken) {
    return res.status(400).json({ error: "reCAPTCHA token is missing." });
  }
  // Verify with Google...
  */
  // ───────────────────────────────────────────────────────────────────────────

  if (!amount || typeof amount !== "number" || amount < 100) {
    return res
      .status(400)
      .json({ error: "Minimum donation amount is ₹100." });
  }

  // ── RAZORPAY INTEGRATION (uncomment when keys are set) ─────────────────────
  //
  // const Razorpay = (await import("razorpay")).default;
  // const razorpay = new Razorpay({
  //   key_id: process.env.RAZORPAY_KEY_ID!,
  //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
  // });
  //
  // const order = await razorpay.orders.create({
  //   amount: amount * 100,          // paise
  //   currency: "INR",
  //   receipt: `uf_${Date.now()}`,
  //   notes: {
  //     frequency,
  //     organization: "Utkrast Foundation",
  //   },
  // });
  //
  // return res.status(200).json({ orderId: order.id, currency: "INR", amount });
  // ───────────────────────────────────────────────────────────────────────────

  // ── STRIPE INTEGRATION (uncomment when keys are set) ──────────────────────
  //
  // const Stripe = (await import("stripe")).default;
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  //
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: amount * 100,          // paise / cents
  //   currency: "inr",
  //   metadata: { frequency, org: "Utkrast Foundation" },
  // });
  //
  // return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  // ───────────────────────────────────────────────────────────────────────────

  // Placeholder response until payment gateway is configured
  return res.status(200).json({
    demo: true,
    message: "Payment gateway not yet configured.",
    amount,
    currency: "INR",
  });
}
