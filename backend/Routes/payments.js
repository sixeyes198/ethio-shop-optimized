const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:5173/#success",
      cancel_url: "http://localhost:5173/#cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error", error.message);
    res.status(500).json({ error: "Unable to create session" });
  }
});

module.exports = router;
