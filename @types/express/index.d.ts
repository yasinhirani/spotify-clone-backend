import * as Express from "express";

declare global {
  declare namespace Express {
    interface Request {
      user?: any;
    }
  }
}
