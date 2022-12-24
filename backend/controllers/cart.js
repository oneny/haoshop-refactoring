const ErrorRes = require("../utils/ErrorRes");
const asyncHandler = require("../middlewares/asyncHandler");
const Cart = require("../models/Cart");

function updatePromise(condition, update) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, update, { new: true, upsert: true })
      .catch((err) => reject(err))
      .then((result) => resolve(result));
  });
}

exports.addCartItems = asyncHandler(async (req, res, next) => {
  const user = req.userId;
  const cartItems = req.body;

  const foundCart = await Cart.findOne({ user }).exec();

  if (!foundCart) {
    const cart = await Cart.create({ user, cartItems });
    return res.status(201).json({ cart });
  }

  let promiseArray = [];

  cartItems.forEach((cartItem) => {
    const { product, size } = cartItem;

    const foundItem = foundCart.cartItems.find(
      (c) => c.product == product && c.size === size
    );

    let condition, update;

    if (foundItem) {
      condition = {
        user,
        "cartItems.product": product,
        "cartItems.size": size,
      };
      update = {
        $set: {
          "cartItems.$": cartItem,
        },
      };
    } else {
      condition = { user };
      update = {
        $push: {
          cartItems: cartItem,
        },
      };
    }

    promiseArray.push(updatePromise(condition, update));
  });

  Promise.all(promiseArray)
    .catch((err) => next(new ErrorRes(err, 400)))
    .then((response) => res.status(201).json({ response }));
});

exports.updateCartItems = asyncHandler(async (req, res, next) => {
  const user = req.userId;
  const cartItems = req.body;

  const cart = await Cart.findOneAndReplace(
    { user },
    { user, cartItems }
  ).exec();

  res.status(201).json({ cart });
});

exports.getCartItems = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.userId })
    .populate("cartItems.product", "_id name brand color price discountPrice productImgs stock")
    .exec();

  const cartItems = cart.cartItems.map((item) => ({
    _id: item.product._id,
    name: item.product.name,
    brand: item.product.brand,
    color: item.product.color,
    img: item.product.productImgs[0].fileName,
    price: item.product.discountPrice || item.product.price,
    qty: item.qty,
    size: item.size,
    stock: item.product.stock,
  }));

  res.status(200).json({ cartItems });
});
