import express from "express";
import { createTodo } from "../../controller/todo/Todo";
import { authenticateJwt } from "../../middleware/Middleware";

const todoRouter = express.Router();

todoRouter.post('/create-todo', authenticateJwt, createTodo);

export default todoRouter;