import { Request, Response, NextFunction } from "express";
import { APISearchError } from "./APIerror";

export const errorHandler = async (err: APISearchError, req: Request, res: Response , next: NextFunction) => {
    console.error(err);
  return res.status(err.status ?? 500).json({message: err.message})
}