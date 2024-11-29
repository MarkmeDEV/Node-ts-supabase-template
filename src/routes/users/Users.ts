import express from "express";
import { getUser } from "../../controller/users/Users"
const UserRouter = express();

UserRouter.get('/user-information', getUser);

export default UserRouter;