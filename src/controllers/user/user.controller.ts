import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import bcrypt from "bcrypt";
import generateJsonWebToken from "../../utils/generateJwt";
import sendMail from "../../utils/sendMail";
import jwt from "jsonwebtoken";
import query from "../../utils/queryExecuter";

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await query(
      `SELECT * FROM users WHERE email = '${req.body.email}'`
    );
    
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordCorrect) {
        if (!user.email_verified) {
          const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${generateJsonWebToken(
            user.email
          )}`;
          await sendMail(user.email, link);
        }
        res.status(200).json({
          success: true,
          message: "Login successfully",
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.email_verified,
            access_token: generateJsonWebToken(user.email),
          },
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Email or password is incorrect",
          data: null,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Email address does not exist",
        data: null,
      });
    }
  }
);

const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await query(
      `SELECT * FROM users WHERE email = '${req.body.email}'`
    );

    if (user) {
      res.status(400).json({
        success: false,
        message: "User with same email address already exist",
        data: null,
      });
    } else {
      const encryptedPassword = await bcrypt.hash(req.body.password, 12);
      await query(
        `INSERT INTO users (name, email, password, email_verified) VALUES ('${
          req.body.name
        }', '${req.body.email}', '${encryptedPassword}', ${false})`
      );

      const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${generateJsonWebToken(
        req.body.email
      )}`;
      await sendMail(req.body.email, link);

      res.status(201).json({
        success: true,
        message: "Signup successful",
        data: null,
      });
    }
  }
);

const sendVerificationEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${generateJsonWebToken(
      req.body.email
    )}`;
    await sendMail(req.body.email, link);

    res.status(200).json({
      success: true,
      message: "Email send successfully",
      data: null,
    });
  }
);

const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.query;

    const verifyToken = token as string;

    if (!verifyToken) {
      res.send(
        "There was an issue reading the token, please try again with a new link"
      );
    } else {
      const user: any = jwt.verify(
        verifyToken,
        process.env.ACCESS_TOKEN_SECRET!
      );
      if (user) {
        const userToUpdate = await query(
          `SELECT * FROM users WHERE email = '${user.email}'`
        );

        if (userToUpdate) {
          if (userToUpdate.emailVerified) {
            res.send("Email is already verified");
          } else {
            await query(
              `UPDATE users SET email_verified=${true} WHERE email = ${
                user.email
              }`
            );
            res.setHeader("Content-Type", "text/html");
            res.send(
              "<p>Email verified successfully, <a href='https://tunetide.vercel.app/login'>Login to your account</a></p>"
            );
          }
        } else {
          res.send("User is not available");
        }
      }
    }
  }
);

export { login, signup, verifyEmail, sendVerificationEmail };
