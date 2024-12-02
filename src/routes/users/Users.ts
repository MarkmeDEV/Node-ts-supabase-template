import express from "express";
import { changePassword, getUser, updateUserInformation } from "../../controller/users/Users"
import { authenticateJwt } from "../../middleware/Middleware";
const UserRouter = express();

/**
 * @swagger
 * /api/v1/user-information:
 *   get:
 *     summary: Fetch user information
 *     tags: [User]
 *     description: Retrieve detailed information about a user by their ID.
 *     security:
 *       - bearerAuth: []
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

UserRouter.get('/user-information', authenticateJwt, getUser);

/**
 * @swagger
 * /api/v1/change-password:
 *   patch:
 *     summary: Change a user's password
 *     tags: [User]
 *     description: Allow a user to change their password by verifying their current password.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Information required to change the user's password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - old_password
 *               - new_password
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user.
 *                 example: "12345"
 *               old_password:
 *                 type: string
 *                 description: The user's current password.
 *                 example: "OldP@ssword1"
 *               new_password:
 *                 type: string
 *                 description: The new password the user wants to set.
 *                 example: "NewP@ssword123"
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Password changed successfully."
 *       400:
 *         description: Invalid request or user data not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Error fetching user data."
 *       401:
 *         description: Invalid current password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Your current password is incorrect."
 *       500:
 *         description: Internal server error during password update.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "An error occurred while updating the password."
 */

UserRouter.patch('/change-password',authenticateJwt, changePassword);

/**
 * @swagger
 * /api/v1/update-user-information:
 *   put:
 *     summary: Update user email and personal information
 *     tags: [User]
 *     description: Updates a user's email and personal information (first name, middle name, last name).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User details for update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - email
 *               - first_name
 *               - last_name
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user to be updated.
 *                 example: "12345"
 *               email:
 *                 type: string
 *                 description: New email address for the user.
 *                 example: "john.doe@example.com"
 *               first_name:
 *                 type: string
 *                 description: The user's first name.
 *                 example: "John"
 *               middle_name:
 *                 type: string
 *                 description: The user's middle name (optional).
 *                 example: "Michael"
 *               last_name:
 *                 type: string
 *                 description: The user's last name.
 *                 example: "Doe"
 *     responses:
 *       200:
 *         description: Successfully updated the user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Successfully updated the user information."
 *       400:
 *         description: Error occurred while updating the email or personal information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Error updating the email."
 */
UserRouter.put('/update-user-information', authenticateJwt, updateUserInformation);

export default UserRouter;