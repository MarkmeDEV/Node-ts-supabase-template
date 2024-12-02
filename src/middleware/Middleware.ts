import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import supabase from "../database/SupabaseClient";

declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload; // Adjust the type according to your JWT payload
        }
    }
}

export const authenticateJwt = async (req:Request, res:Response, next:NextFunction): Promise<void> => {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if(!accessToken){
        res.status(401).json({ message: "Access denied, no token provided" })
        return;
    }

    const { data, error } = await supabase.auth.getUser(accessToken);

    if(!data.user?.email?.endsWith('@gmail.com')){
        res.status(401).json({ message: "Invalid token" });
        return;
    }

    if(error){
        res.status(401).json({ message: "Token has expired, please login again" });
        return;
    }

    next();

    // try{ 
    //     const decoded = jwt.verify(accessToken, process.env.SECRET_KEY!);

    //     req.user = decoded;

    //     next();

    // }catch(error){
    //     if(error instanceof Error){
    //         if (error.name === "TokenExpiredError") {
    //             res.status(401).json({ message: "Token has expired, please login again" });
    //             return;
    //         }
    //     }

    //     res.status(500).json({ message: "Invalid token" });
    //     return;
    // }
}