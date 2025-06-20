import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../../../shared/utils/CustomError"; 
import environment from "../../../infrasrtucture/config/environment";
import { User } from "../../../domain/entities/User";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return next(new CustomError("Access denied, token missing!", 401));

  const JWT_SECRET_KEY = environment.JWT_SECRET_KEY;
  if (!JWT_SECRET_KEY) return next(new CustomError("Key missing!", 400));

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    if (!decoded) return next(new CustomError("Access Forbidden", 403));
    req.user = decoded as User;
    next();
  } catch (error) {
    console.log("Error in user auth:", error);
    next(new CustomError("Invalid token", 401));
  }
};
