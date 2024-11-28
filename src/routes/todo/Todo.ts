import express from "express";
import { createTodo } from "../../controller/todo/Todo";

const todoRouter = express.Router();

todoRouter.post('/create-todo', createTodo);

export default todoRouter;