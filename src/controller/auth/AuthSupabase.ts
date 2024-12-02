import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import supabase from "../../database/SupabaseClient";
import { AuthResponse } from "@supabase/supabase-js";


export const SupabaseLogin = expressAsyncHandler(async (req:Request, res:Response):Promise<void> => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({ message: "Fill up all the required fields." })
    }

    const { data, error }: AuthResponse = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error){
        res.status(401).json({ message: error.message });
        return;
    }

    res.cookie('refreshToken', data.session?.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    })

    res.status(200).json({ message: "Successfully Logged in", user: data.user, accessToken: data.session?.access_token })
})  

export const SupabaseRegister = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password, first_name, last_name, middle_name } = req.body;

    const { data: userAuth, error: errorAuth } = await supabase.auth.signUp({
        email, 
        password
    });

    if (errorAuth) {
        res.status(401).json({ message: errorAuth.message });
        return;
    }

    const user_id = userAuth.user?.id;

    const { error: errorInsert } = await supabase
        .from("users_information")
        .insert({ user_id, first_name, middle_name, last_name });

    if (errorInsert) {
        res.status(401).json({ message: errorInsert.message });
        return;
    }

    res.status(201).json({ message: "Registration successful!" });

});

export const SupabaseLogout = expressAsyncHandler(async (req:Request, res:Response):Promise<void> => {
    
    const { error } = await supabase.auth.signOut();

    if(error) {
        res.status(400).json({ message: error.message, isSuccess: false });
        return;
    }

    res.status(200).json({ isSuccess: true, message: "Successfully logout" });
});

export const generateAccessToken = expressAsyncHandler(async (req:Request, res:Response):Promise<void> => {

    const refreshToken = req.cookies['refreshToken'];

    const { data: { session }, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    if(error){
        res.status(401).json({ message: error.message });
        return;
    }

    res.status(200).json({ accessToken: session?.access_token });
});