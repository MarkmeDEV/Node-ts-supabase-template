import expressAsyncHandler from "express-async-handler";
import { Todo } from "../../models/todo/todoType";

export const createTodo = expressAsyncHandler(async  (req, res): Promise<void> => {
    const { title, description, tags } = req.body;

    const data: Omit <Todo, "id" | "created_at"> = {
        title: title,
        description: description,
        tags: tags,
    }

    res.status(200).json({message: "Created todos", data: data})
    return;
});