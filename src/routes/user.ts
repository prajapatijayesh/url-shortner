
import Router from "express";
import { getAllUsers } from "../controllers/user";

const UserRouter = Router();

UserRouter.get('/', getAllUsers);

export default UserRouter;