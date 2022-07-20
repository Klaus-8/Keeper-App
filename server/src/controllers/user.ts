import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import { User } from "../models/index.js";
import logger from "../logger/logger.js";

export const userLogin = async (req: Request, res: Response) => {
  try {
    logger.info("⏳ Verifying User Credentials ...");

    const { email, password } = req.body;

    const isUserRegistered = await User.findOne({ email });

    if (!isUserRegistered) {
      logger.warn("✋ User's email is invalid or not registered.");
      return res.status(404).json({
        message: "Login failed, User's email invalid or not registered.",
      });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      isUserRegistered.password,
      process.env.USER_SECRET as string
    ).toString(CryptoJS.enc.Utf8);

    if (password === decryptedPassword) {
      jwt.sign(
        { name: isUserRegistered.name, email: isUserRegistered.email },
        process.env.USER_SECRET as string,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) {
            logger.error({
              error: err,
              message: "🚨 Error Generating JWT Token.",
            });
            return res.status(500).json(err);
          } else {
            logger.info("✨ User Verified Sucessfully.");
            return res.status(200).json(token);
          }
        }
      );
    } else {
      logger.error("🚨 Invalid Password!");
      return res.status(401).json({ message: "Invalid password!" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error);
  }
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    logger.info("⏳ Registering User ...");

    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.USER_SECRET as string
    );

    const newUser = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const registeredUser = await newUser.save();

    jwt.sign(
      { name: registeredUser.name, email: registeredUser.email },
      process.env.USER_SECRET as string,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          logger.error({
            error: err,
            message: "🚨 Error Generating JWT Token.",
          });
          return res.status(500).json(err);
        } else {
          logger.info("✨ User Registered Sucessfully.");
          return res.status(201).json(token);
        }
      }
    );
  } catch (error) {
    logger.error(error);
    return res.status(500).json(error);
  }
};
