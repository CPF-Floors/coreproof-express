import express from "express";
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import corsOptions from "./libs/corsOptions.js";

const server = express();

server.use(cors(corsOptions))
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

server.use("/auth", authRoutes);
server.use("/cart", cartRoutes);
server.use("/product", productRoutes);
server.use("/user", userRoutes);
server.use("/order", orderRoutes);

export default server;
