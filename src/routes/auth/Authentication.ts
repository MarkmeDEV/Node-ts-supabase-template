import express from "express";
import { Login, Register } from "../../controller/auth/Authentication";
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API for user authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Authenticates a user.
 */
authRouter.post('/login', Login);
authRouter.post('/register', Register);

export default authRouter;