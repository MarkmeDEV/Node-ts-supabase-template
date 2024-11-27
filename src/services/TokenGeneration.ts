import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: number) => {
    return jwt.sign({ id: userId }, process.env.SECRET_KEY!, {expiresIn: '1hr'});
}

export const generateRefreshToken = (userId: number) => {
    return jwt.sign({id: userId}, process.env.SECRET_KEY_REFRESH_TOKEN!, { expiresIn: '1d' });
}

export const verifyToken = (token: string) => {
    try{

        const decoded = jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN!);

        return decoded;

    }catch(error){
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Refresh token has expired.");
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid refresh token.");
        } else {
            throw new Error("An error occurred while verifying the refresh token.");
        }
    }
}