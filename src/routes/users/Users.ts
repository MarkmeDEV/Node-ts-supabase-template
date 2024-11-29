import express from "express";
import { getUser } from "../../controller/users/Users"
const UserRouter = express();
/**
 * @swagger
 * /api/v1/user-information:
 *   get:
 *     summary: Fetch user information
 *     tags: [User]
 *     description: Retrieve detailed information about a user by their ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose information is being retrieved.
 *     responses:
 *       200:
 *         description: Successfully fetched the user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: Successfully fetched the user information
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         description: The user's email address.
 *                         example: user@example.com
 *                       users_information:
 *                         type: object
 *                         properties:
 *                           first_name:
 *                             type: string
 *                             description: The user's first name.
 *                             example: John
 *                           last_name:
 *                             type: string
 *                             description: The user's last name.
 *                             example: Doe
 *                           middle_name:
 *                             type: string
 *                             description: The user's middle name.
 *                             example: Michael
 *       400:
 *         description: Error retrieving user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: An error occurred while fetching user information.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: An unexpected error occurred. Please try again later.
 */

UserRouter.get('/user-information', getUser);

export default UserRouter;