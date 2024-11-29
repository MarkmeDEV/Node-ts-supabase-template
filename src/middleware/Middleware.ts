import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload;
        }
    }
}

export const authenticateJwt = (req:Request, res:Response, next:NextFunction): void => {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if(!accessToken){
        res.status(401).json({ message: "Access denied, no token provided" })
        return;
    }

    try{ 
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY!);

        req.user = decoded;

        next();

    }catch(error){
        if(error instanceof Error){
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ message: "Token has expired, please login again" });
                return;
            }
        }

        res.status(500).json({ message: "Invalid token" });
        return;
    }
}