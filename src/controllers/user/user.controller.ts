import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { User } from "../../model/user/user.model";
import bcrypt from "bcrypt";
import generateJsonWebToken from "../../utils/generateJwt";
import sendMail from "../../utils/sendMail";
import jwt from "jsonwebtoken";

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordCorrect) {
        if (!user.emailVerified) {
          const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${generateJsonWebToken(
            user.email
          )}`;
          await sendMail(user.email, link);
        }
        res.status(200).json({
          success: true,
          message: "Login successfully",
          data: {
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
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
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json({
        success: false,
        message: "User with same email address already exist",
        data: null,
      });
    } else {
      const userBody = {
        ...req.body,
        emailVerified: false,
      };
      await User.create(userBody);

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
    const link = `http://localhost:8080/api/user/verifyEmail?token=${generateJsonWebToken(
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
        const userToUpdate = await User.findOne({ email: user.email });
        if(userToUpdate){
          if(userToUpdate.emailVerified){
            res.send("Email is already verified")
          } else {
            await User.updateOne(
              { email: user.email },
              { emailVerified: true }
            );
            res.send("Email verified successfully");
          }
        } else{
          res.send("User is not available")
        }
      }
    }
  }
);

export { login, signup, verifyEmail, sendVerificationEmail };
