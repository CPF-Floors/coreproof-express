import Cart from "../models/cart.model.js"

export const getMyCart = async (req, res) => {
    const { id } = req.user;
    try {
        const cart = await Cart.findOne({ user: id }).populate('items.product');

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

export const addItemsToCart = async (req, res) => {
    const { item } = req.body;
    const { id } = req.user;

    try {
        let cart = await Cart.findOne({ user: id });

        if (!cart) {
            cart = new Cart({ user: id, items: [] });
        }

        cart.items.push(item._id);

        await cart.save();

        res.status(200).json({ message: "Item added successfully", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const removeItemsFromCart = async (req, res) => {
    const { item } = req.body
    const { id } = req.user

    try {
        let cart = await Cart.findOne({ user: id });

        cart.items = cart.items.filter(cartItem => cartItem._id.toString() !== item._id)

        await cart.save()

        res.status(204).json({ message: "item deleted from cart" }, cart)
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const emptyCartAfterOrder = async (req, res) => {
    const { id } = req.user
    try {
        const cart = await Cart.findOne({ user: id })

        cart.items = []
        cart.save()

        res.status(204).json({ message: "Cart is now empty" }, cart)
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}