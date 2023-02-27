const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Cart = require("../../models/ecommerce/Cart");
const User = require("../../models/user/User");
const Product = require("../../models/ecommerce/Product");

router.post("/add", async (req, res) => {
  const { UserId, ProductId, quantité } = req.body;

  try {
    // Vérifie si le produit est déjà dans le panier
    const existingCart = await Cart.findOne({
      ProductId: Product._id,
      "Products.Product": ProductId,
    });
    if (existingCart) {
      // Si le produit est déjà dans le panier, ajouter la quantité au produit existant
      const updatedCart = await Cart.findOneAndUpdate(
        { User: UserId, "Products.Product": ProductId },
        { $inc: { "Products.$.quantité": quantité } },
        { new: true }
      );
      return res.status(200).send(updatedCart);
    }

    // Si le produit n'est pas dans le panier, créer un nouveau produit dans le panier
    const newCart = await Cart.findOneAndUpdate(
      { User: UserId },
      { $push: { Products: { Product: ProductId, quantité } } },
      { new: true, upsert: true }
    );
    return res.status(200).send(newCart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

// get cart by User id
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find({ User: req.User._id });
    return res.status(200).json(cartItems);
  } catch (error) {
    throw new Error(error);
  }
});

//
router.post("/delete", async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ itemName: req.body.name });
    const filteredItem = await Cart.findByIdAndDelete({ _id: cartItem._id });
    return res.status(200).json(filteredItem);
  } catch (error) {
    throw new Error(error);
  }
});

router.put("/increase-cart-quantité", async (req, res) => {
  const quantité = req.body.quantité;
  if (quantité >= 5) return;
  const item = await Cart.findOne({ itemName: req.body.name });
  Cart.findByIdAndUpdate(
    { _id: item._id },
    {
      $set: {
        quantité: quantité + 1,
      },
    }
  ).exec((err, result) => {
    if (err) {
      console.log(error);
      res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

async function payment_success() {
  const { paymentIntent, error } = await stripe.confirmCardPayment(
    process.env.STRIPE_SECRET_KEY
  );
  if (error) {
    // Handle error here
    console.log(error);
  } else if (paymentIntent && paymentIntent.status === "succeeded") {
    // Handle successful payment here
    console.log("success");
  }
}

router.post("/checkout", auth, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: req.body.email,
      submit_type: "pay",
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [{ shipping_rate: "shr_1M9N6vSEi48qcQQWQVHnuumn" }],
      line_items: req.body.items.map((item) => {
        const img = item.image;
        return {
          price_data: {
            currency: "usd",
            Product_data: {
              name: item.name,
              images: [img],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantité: {
            enabled: true,
            minimum: 1,
            maximum: 5,
          },
          quantité: item.quantité,
        };
      }),

      success_url:
        "https://shoes-store-frontend-typescript.vercel.app/order-success",
      cancel_url:
        "https://shoes-store-frontend-typescript.vercel.app/order-failed",
    });

    res.json({ url: session.url });

    // payment_success()
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
