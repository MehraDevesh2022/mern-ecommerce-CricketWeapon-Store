const asyncWrapper = require("../middleWare/asyncWrapper");
const ErrorHandler = require("../utils/errorHandler");

// process the payment
exports.processPayment = asyncWrapper(async (req, res, next) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  console.log('=== PAYMENT PROCESSING ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Amount:', req.body.amount);
  console.log('User ID:', req.user?.id);
  console.log('==========================');

  // Validate payment amount
  if (!req.body.amount || req.body.amount <= 0) {
    return next(new ErrorHandler("Invalid payment amount", 400));
  }

  // Validate amount is not too large (max 999999999 paise = 9999999.99 INR)
  if (req.body.amount > 999999999) {
    return next(new ErrorHandler("Payment amount too large", 400));
  }

  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
        userId: req.user?.id || 'unknown',
        timestamp: new Date().toISOString()
      },
    });

    console.log('Payment Intent Created:', myPayment.id);

    res.status(200).json({ 
      success: true, 
      client_secret: myPayment.client_secret 
    });
  } catch (error) {
    console.error('Stripe Payment Error:', error.message);
    return next(new ErrorHandler("Payment processing failed", 500));
  }
});

// send STRIPE_API_KEY to user =>
exports.sendStripeApiKey = asyncWrapper(async (req, res, next) => {
  if (!process.env.STRIPE_API_KEY) {
    return next(new ErrorHandler("Stripe API key not configured", 500));
  }
  
  res.status(200).json({ 
    stripeApiKey: process.env.STRIPE_API_KEY 
  });
});
