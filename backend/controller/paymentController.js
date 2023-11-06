const asyncWrapper = require("../middleWare/asyncWrapper");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// process the payment
exports.processPayment = asyncWrapper(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount, // Corrected typo "ammount" to "amount"
      currency: "inr",
      metadata: {
        company: "Ecommerce", // Not mandatory
      },
    });

    res.status(200).json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// send STRIPE_API_KEY to user
exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_SECRET_KEY });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
