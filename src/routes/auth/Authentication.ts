import express from "express";
import { generateAccessTokenApi, Login, Register } from "../../controller/auth/Authentication";

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: APIs for user authentication and account management
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     description: Authenticate a user with their email and password.
 *     requestBody:
 *       description: User credentials for logging in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT access token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *       400:
 *         description: Missing required inputs
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
authRouter.post("/login", Login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Create a new user account by providing required details.
 *     requestBody:
 *       description: User details for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password123
 *               first_name:
 *                 type: string
 *                 description: The user's first name.
 *                 example: John
 *               middle_name:
 *                 type: string
 *                 description: The user's middle name.
 *                 example: Michael
 *               last_name:
 *                 type: string
 *                 description: The user's last name.
 *                 example: Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: User registered successfully
 *       400:
 *         description: Invalid or missing input fields
 *       500:
 *         description: Internal server error
 */
authRouter.post("/register", Register);

/**
 * @swagger
 * /auth/generate-refresh-token:
 *   post:
 *     summary: Generate a new access token using the refresh token stored in cookies
 *     tags: [Authentication]
 *     description: Use the refresh token stored in cookies to generate a new access token once the previous access token has expired.
 *     responses:
 *       200:
 *         description: Successfully generated a new access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Access token successfully generated
 *                 accessToken:
 *                   type: string
 *                   description: The new access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid or expired refresh token || No refresh token provided
 *       401:
 *         description: Refresh token has expired, please log in again.
 *       500:
 *         description: Error verifying the refresh token. Please try again later.
 */
authRouter.post("/generate-refresh-token", generateAccessTokenApi);

export default authRouter;
