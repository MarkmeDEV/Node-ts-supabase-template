import express from "express";
import { createTodo, deleteTodo, updateTodo } from "../../controller/todo/Todo";
import { authenticateJwt } from "../../middleware/Middleware";

const todoRouter = express.Router();

todoRouter.post('/create-todo', authenticateJwt, createTodo);

todoRouter.delete('/delete-todo/:id', authenticateJwt, deleteTodo);

todoRouter.put('/update-todo/:id', authenticateJwt, updateTodo);

export default todoRouter;