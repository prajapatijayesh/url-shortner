import { Router } from 'express';
import Route from "@interfaces/routes.interface";
import ShortURLController from '@controllers/short-url.controller';
import AuthMiddleware from '@middlewares/auth.middleware';

class ShortURLRoute implements Route {
    public path = '/url';
    public router = Router();
    public shortUrlCtrl = new ShortURLController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}/shorten`, AuthMiddleware, this.shortUrlCtrl.shorten);
        this.router.get(`${this.path}/fetchBycode/:code`, AuthMiddleware, this.shortUrlCtrl.fetchByCode);
    }
}

export default ShortURLRoute;