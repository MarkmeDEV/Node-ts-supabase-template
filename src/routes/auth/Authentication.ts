import express from "express";
import { generateAccessTokenApi } from "../../controller/auth/Authentication";
import { SupabaseLogin, SupabaseRegister, SupabaseLogout, generateAccessToken } from "../../controller/auth/AuthSupabase";

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
 *                   example: Successfully logged in
 *                 user:
 *                   type: object
 *                   description: User information
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User's unique identifier
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: user@example.com
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Account creation timestamp
 *                       example: "2024-12-01T12:34:56.789Z"
 *                 access_token:
 *                   type: string
 *                   description: Access token for authenticated requests
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 session:
 *                   type: object
 *                   description: Session information
 *                   properties:
 *                     refresh_token:
 *                       type: string
 *                       description: Refresh token for renewing access
 *                       example: "1OrAaGmZ12UA4yBGfPUK_sadw"
 *                     expires_at:
 *                       type: number
 *                       description: Expiration time for the session in seconds since epoch
 *                       example: 1704224000
 *       400:
 *         description: Missing required inputs
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
authRouter.post("/login", SupabaseLogin);

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
authRouter.post("/register", SupabaseRegister);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Remove all the user session and cookies
 *     tags: [Authentication]
 *     description: Remove all the user sessions and information about the user who logged in.
 *     responses:
 *       200:
 *         description: Successful logout for user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Successfully logout
 *                 isSuccess:
 *                   type: boolean
 *                   description: true or false for success
 *                   example: true
 *       400:
 *         description: Error logging out the user.
 */
authRouter.post('/logout', SupabaseLogout);

/**
 * @swagger
 * /auth/get-access-token:
 *   get:
 *     summary: Generate a new access token using a refresh token
 *     tags: [Authentication]
 *     description: Refresh the user's access token using a valid refresh token stored in cookies.
 *     requestBody:
 *       description: The request requires a valid refresh token from cookies to generate a new access token.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token used to generate a new access token.
 *                 example: tXKiAuHfFy-uo30iutQYpw
 *     responses:
 *       200:
 *         description: Successfully generated a new access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The new access token generated using the refresh token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiJ9.fGZB1-hwi2cBZztpzts7nlsDg1smr9zAf9xlVnIUwWqg"
 *       401:
 *         description: Invalid or expired refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message explaining why the request failed.
 *                   example: "Invalid or expired refresh token."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message for server failure.
 *                   example: "Internal server error."
 */
authRouter.get('/get-access-token', generateAccessToken);

export default authRouter;
