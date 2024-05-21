import Cart from "../models/cart.model.js";
import { getUserFromToken } from "../libs/getUser.js";

export const getMyCart = async (req, res) => {
  try {
    await getUserFromToken(req);
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" }, error);
  }
};

export const addItemsToCart = async (req, res) => {
  try {
    await getUserFromToken(req);
    const { id } = req.user;
    const { item } = req.body;
    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }

    cart.items.push(item.id);

    await cart.save();

    res.status(200).json({ message: "Item added successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" }, error);
  }
};

export const removeItemsFromCart = async (req, res) => {
  try {
    await getUserFromToken(req);
    const { id } = req.user;
    const { item } = req.body;
    let cart = await Cart.findOne({ user: id });

    cart.items = cart.items.filter(
      (cartItem) => cartItem._id.toString() !== item._id
    );

    await cart.save();

    res.status(204).json({ message: "item deleted from cart" }, cart);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" }, error);
  }
};

export const emptyCartAfterOrder = async (req, res) => {
  try {
    await getUserFromToken(req);
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id });

    cart.items = [];
    cart.save();

    res.status(204).json({ message: "Cart is now empty" }, cart);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" }, error);
  }
};
