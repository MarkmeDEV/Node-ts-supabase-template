import expressAsyncHandler from "express-async-handler";
import supabase from "../../database/SupabaseClient";

const validTags = ['working', 'not started', 'paused', 'completed']

export const createTodo = expressAsyncHandler(async  (req, res): Promise<void> => {
    const { title, description, tags } = req.body;

    if(title === ''  ||description === '' || tags === ''){
        res.status(400).json({ message: "All fields are required" })
    }

    if(!validTags.includes(tags)){
         res.status(400).json({ message: "Invalid tag value" });
         return;
    }

    const { error:insertError } = await supabase
    .from('todos')
    .insert({ title: title, description: description, tags: tags });

    if(insertError){
        res.status(500).json({ message: insertError.message });
        return;
    }

    res.status(200).json({message: "Created todos" })
    return;
});