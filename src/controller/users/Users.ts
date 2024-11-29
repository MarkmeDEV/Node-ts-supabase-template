import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import supabase from "../../database/SupabaseClient";
import bcrypt from "bcrypt";

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

export const changePassword = expressAsyncHandler(async (req, res): Promise<void> => {
    const { id, old_password, new_password } = req.body;

    const { data:getUser, error:getError } = await supabase
    .from('users')
    .select('password')
    .eq('id', id)
    .single()

    if (getError || !getUser) {
        res.status(400).json({ message: getError?.message || "Error fetching user data" });
        return;
    }

    const hashPassword = await bcrypt.compare(old_password, getUser.password);

    if (!hashPassword) {
        res.status(401).json({ message: "Your current password is incorrect." });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(new_password, 10);

    const {error:changePsError} = await supabase
    .from('users')
    .update({ password: passwordHash })
    .eq('id', id)

    if (changePsError) {
        res.status(500).json({ message: "An error occurred while updating the password." });
        return;
    }

    res.status(200).json({ message: "Change Passoword Successfully" });

});


export const updateUserInformation = expressAsyncHandler(async (req, res):Promise<void> =>{
    const { id, email, first_name, middle_name, last_name } = req.body;

    const { error:updateError } = await supabase
    .from('users')
    .update({ email: email })
    .eq('id', id)

    if(updateError){
        res.status(400).json({ message: "Error updating the email" });
        return;
    }

    const { error:updateInfoError } = await supabase
    .from('users_information')
    .update({ first_name: first_name, middle_name: middle_name, last_name: last_name })
    .eq('user_id', id);

    if(updateInfoError){
        res.status(400).json({ message: "Error updating the personal informations" });
        return;    
    }

    res.status(200).json({ message: "Successfully updated the user information." });
})