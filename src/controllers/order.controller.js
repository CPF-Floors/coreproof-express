import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import { getUserFromToken } from "../libs/getUser.js";
//import Queue from "../libs/queue.js";

//const orderQueue = new Queue()

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
};

export const getAllPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
};

export const getAllInProcessOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "In process" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
};

export const getAllCompletedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Completed" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
};

export const getOrdersFromUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ client: userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
};

export const changeStatusToInProcess = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "In process";
    await order.save();
    res.status(200).json({ message: "Order status changed succesfully" });
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
};

export const changeStatusToCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = "Completed";
    await order.save();
    res.status(200).json({ message: "Order status changed succesfully" });
  } catch (error) {
    res.status(500).json("Error en el servidor");
  }
};

export const createNewOrder = async (req, res) => {
  try {
    await getUserFromToken(req);
    const { id } = req.user;

    const cart = await Cart.findOne({ user: id }).populate("items.product");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const items = cart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    const order = await Order.create({
      client: id,
      productList: items,
    });

    //orderQueue.enqueue(order)

    res.status(201).json({
      message: "Order created successfully",
      order: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

