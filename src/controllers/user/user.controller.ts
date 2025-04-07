import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import bcrypt from "bcrypt";
import {generateJsonWebToken, generateJsonWebTokenEmail} from "../../utils/generateJwt";
import sendMail from "../../utils/sendMail";
import jwt from "jsonwebtoken";
import query from "../../utils/queryExecuter";
import ApiResponse from "../../utils/apiResponse";
import ApiError from "../../utils/apiError";

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
        res.status(200).json(
          new ApiResponse(
            {
              id: user.id,
              name: user.name,
              email: user.email,
              emailVerified: user.email_verified,
              access_token: generateJsonWebToken(user.email, user.id),
            },
            "Login successfully"
          )
        );
      } else {
        throw new ApiError("Email or password is incorrect", 401);
      }
    } else {
      throw new ApiError("Email address does not exist", 404);
    }
  }
);

const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await query(
      `SELECT * FROM users WHERE email = '${req.body.email}'`
    );

    if (user) {
      throw new ApiError("User with same email address already exist", 400);
    } else {
      const encryptedPassword = await bcrypt.hash(req.body.password, 12);
      await query(
        `INSERT INTO users (name, email, password, email_verified) VALUES ('${
          req.body.name
        }', '${req.body.email}', '${encryptedPassword}', ${false})`
      );

      const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${generateJsonWebTokenEmail(
        req.body.email
      )}`;
      await sendMail(req.body.email, link);

      res.status(201).json(new ApiResponse(null, "Signup successful"));
    }
  }
);

const sendVerificationEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await query(
      `SELECT * FROM users WHERE email = '${req.body.email}'`
    );
    if (user) {
      const link = `https://tunetide-api.vercel.app/api/user/verifyEmail?token=${generateJsonWebTokenEmail(
        req.body.email
      )}`;
      await sendMail(req.body.email, link);

      res.status(200).json(new ApiResponse(null, "Email send successfully"));
    } else {
      throw new ApiError(
        "User is not available, Make sure you have signed up first",
        404
      );
    }
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
          if (userToUpdate.email_verified) {
            res.send("Email is already verified");
          } else {
            await query(
              `UPDATE users SET email_verified=${true} WHERE email = '${
                user.email
              }'`
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
