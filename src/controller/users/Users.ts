import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import supabase from "../../database/SupabaseClient";

export const getUser = expressAsyncHandler(async (req, res):Promise<void> => {
    const { id } = req.body;

    const { data:getUser, error:userError } = await supabase
    .from('users')
    .select(`
        email,
        users_information(
        first_name,
        last_name,
        middle_name
        )
    `)
    .eq('id', id)

    if(userError){
        res.status(400).json({ message: userError.message });
        return;
    }

    res.status(200).json({ message: "Successfully fetched the user information", data:getUser })

})