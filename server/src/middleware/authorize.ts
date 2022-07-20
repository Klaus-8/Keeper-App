import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import logger from "../logger/logger";

export const authorizeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("⏳ Verifying Token ...");
  const token = (req.headers.authorization as string).split(" ")[1];

  jwt.verify(token, process.env.USER_SECRET as string, (err, decoded) => {
    if (err) {
      logger.error("🚨 Invalid Token!");
      return res.status(401).json({ error: err, message: "Invalid Token!" });
    } else {
      logger.info("✨ Token Verified!");
      res.locals.user = decoded;
      next();
    }
  });
};
