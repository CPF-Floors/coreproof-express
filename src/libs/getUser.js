import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const getUserFromToken = async (req) => {
  return new Promise((resolve, reject) => {
    const { token } = req.cookies;
    if (!token) {
      return reject({ message: "No token provided", statusCode: 401 });
    }

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return reject({ message: "Invalid token", statusCode: 401 });
      }
      if (!user) {
        return reject({
          message: "Token does not contain user information",
          statusCode: 401,
        });
      }
      req.user = user;
      resolve();
    });
  });
};
