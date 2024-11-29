import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../../controller/todo/Todo";
import { authenticateJwt } from "../../middleware/Middleware";

const todoRouter = express.Router();

todoRouter.get('/get-todo', authenticateJwt, getTodo);

todoRouter.post('/create-todo', authenticateJwt, createTodo);

todoRouter.put('/update-todo', authenticateJwt, updateTodo);

todoRouter.delete('/delete-todo/:id', authenticateJwt, deleteTodo);


export default todoRouter;