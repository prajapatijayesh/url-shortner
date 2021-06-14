/**
 * 
 */

import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import config from 'config';
import jwt from 'jsonwebtoken';
import Route from "@interfaces/routes.interface";
import AuthController from "@controllers/auth.controller";
import HttpException from '@/exceptions/HttpException';

class AuthRoute implements Route {
    public path = '/auth';
    public router = Router();
    public authCtrl = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Local
        this.router.post(`${this.path}/singup`, this.authCtrl.singUp);
        this.router.post(`${this.path}/singin`, this.authCtrl.singIn);
        // Google
        this.router.get(`${this.path}/google`, passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));
        this.router.get(`${this.path}/google/callback`, passport.authenticate('google', {
            successRedirect: '/api/auth/success',
            failureRedirect: '/api/auth/failure'
        }));
        this.router.get(`${this.path}/success`, (req: Request, res: Response, next: NextFunction) => {
            const findUser = req.currentUser;
            console.log('findUser',findUser);
            // const payload = {
            //     user: {
            //         id: findUser.id
            //     }
            // };
            // const { secretKey, expiresIn } = config.get('jwt');
            // const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
            return res.status(200).json({
                message: 'accessToken',
                access_token: 'token'
            });

        });
        this.router.get(`${this.path}/failure`, (req: Request, res: Response, next: NextFunction) => {
            next(new HttpException(401, 'Authentication failure'))
        });
    }
}

export default AuthRoute;