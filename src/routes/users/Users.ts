import express from "express";
import { getUser } from "../../controller/users/Users"
const UserRouter = express();

UserRouter.get('/users', getUser);

export default UserRouter;