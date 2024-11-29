import express from "express";
import { createTodo, deleteTodo, getTodo, getTodoInTag, updateTodo } from "../../controller/todo/Todo";
import { authenticateJwt } from "../../middleware/Middleware";

const todoRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Todo List
 *     description: APIs for Todo Items 
 */

/**
 * @swagger
 * /api/v1/get-todo:
 *   get:
 *     summary: Fetch all todo items
 *     tags: [Todo List]
 *     description: Get all todo list items
 *     responses:
 *       200:
 *         description: Successfully fetch all the todo items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Successfully fetched all the todo items
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Id of the todo item
 *                         example: 1
 *                       title:
 *                         type: string
 *                         description: Title of the todo item
 *                         example: Activity 1
 *                       description:
 *                         type: string
 *                         description: Description of the todo item
 *                         example: Lorem ipsum marti somen uol il et. at...
 *                       tags:
 *                         type: string
 *                         description: Tags of the todo item
 *                         example: paused
 *                       created_at:
 *                         type: string
 *                         description: Timestamp when the todo item was created
 *                         example: 2020-12-23 1:30:54
 *       400:
 *         description: Error fetching the data
 */

todoRouter.get('/get-todo', authenticateJwt, getTodo);

/**
 * @swagger
 * /api/v1/create-todo:
 *   post:
 *     summary: Create a todo item
 *     tags: [Todo List]
 *     description: Create a new todo item
 *     requestBody:
 *       description: Todo list request body information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tag
 *             properties:
 *               title:
 *                 type: string
 *                 description: Todo item title.
 *                 example: Footwork Everyday
 *               description:
 *                 type: string
 *                 description: Description or short information about this.
 *                 example: leg day every tues day 1hr - 2hrs durations.
 *               tag:
 *                 type: string
 *                 description: Current status of this todo item.
 *                 example: not started
 *     responses:
 *       200:
 *         description: Successfully created new todo item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Successfully created new todo item.
 *                 data:
 *                   type: object
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: Title of the todo item
 *                         example: Activity 1
 *                       description:
 *                         type: string
 *                         description: Description of the todo item
 *                         example: Lorem ipsum marti somen uol il et. at...
 *                       tags:
 *                         type: string
 *                         description: Tags of the todo item
 *                         example: paused
 *       400:
 *         description: Error fetching the data
 */
todoRouter.post('/create-todo', authenticateJwt, createTodo);

/**
 * @swagger
 * /api/v1/update-todo:
 *   put:
 *     summary: Update a todo item
 *     tags: [Todo List]
 *     description: Update an existing todo item by providing its ID and the updated details.
 *     requestBody:
 *       description: The details of the todo item to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - description
 *               - tags
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the todo item to update.
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Updated title of the todo item.
 *                 example: Footwork Practice
 *               description:
 *                 type: string
 *                 description: Updated description or information about this todo item.
 *                 example: Practice footwork drills for 1-2 hours every Tuesday.
 *               tags:
 *                 type: string
 *                 description: Updated tags or status for the todo item.
 *                 example: in progress
 *     responses:
 *       200:
 *         description: Successfully updated the todo item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Successfully updated the todo item.
 *       404:
 *         description: Todo item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Todo item not found.
 *       400:
 *         description: Error updating the todo item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Error updating the todo list.
 */

todoRouter.put('/update-todo', authenticateJwt, updateTodo);
/**
 * @swagger
 * /api/v1/delete-todo/{id}:
 *   delete:
 *     summary: Delete a todo item
 *     tags: [Todo List]
 *     description: Delete an existing todo item by providing its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the todo item to delete.
 *     responses:
 *       200:
 *         description: Todo item successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Todo item successfully deleted.
 *       404:
 *         description: Todo item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Todo item not found.
 *       500:
 *         description: Server error while deleting the todo item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: An error occurred while deleting the todo item. Please try again later.
 */
todoRouter.delete('/delete-todo/:id', authenticateJwt, deleteTodo);

todoRouter.get('/get-todo-in-tag', getTodoInTag);
export default todoRouter;