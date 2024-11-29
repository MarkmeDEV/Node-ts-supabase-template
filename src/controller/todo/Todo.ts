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


export const deleteTodo = expressAsyncHandler(async (req, res): Promise<void> => {
    const { id } = req.params;

    const { data: todo, error: fetchError } = await supabase
        .from('todos')
        .select('id')
        .eq('id', id)
        .single();

    if (fetchError || !todo) {
        res.status(404).json({ message: "Todo item not found." });
        return;
    }

    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

    if (error) {
        res.status(500).json({ message: error.message || "An error occurred while deleting the todo item. Please try again later." });
        return;
    }

    res.status(200).json({ message: "Todo item successfully deleted." });
    });

export const updateTodo = expressAsyncHandler(async (req, res):Promise<void> => {

    const { id, title, description, tags } = req.body;

    const { data: todo, error: fetchError } = await supabase
    .from('todos')
    .select('id')
    .eq('id', id)
    .single();

    if (fetchError || !todo) {
        res.status(404).json({ message: "Todo item not found." });
        return;
    }

    const { error:updateError } = await supabase
    .from('todos')
    .update({ title: title, description: description, tags: tags })
    .eq('id', id)

    if(updateError){
        res.status(400).json({ message: updateError.message || "Error updating the todo list."})
        return;
    }

    res.status(200).json({ message: "Successfully updated the todo item" });

})