import { Router } from "express";
import ShortURLRoute from "./short-url.route";
import UserRouter from "./user";


const BaseRouter = Router();
BaseRouter.use('/user', UserRouter);

export default BaseRouter;