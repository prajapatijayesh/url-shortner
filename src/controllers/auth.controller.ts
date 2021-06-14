/**
 * 
 */

import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from 'config';
import passport from '@/middlewares/passport';
import AuthService from "@/services/auth.service";

class AuthController {
    public authService = new AuthService();

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    public singUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = req.body;
            const signUpUserData = await this.authService.singup(userData);
            return res.status(201).json({
                data: signUpUserData,
                message: 'success'
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    public singIn = async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', { session: false }, (err: Error, findUser: any, info: any) => {
            if (err) { return next(err); }
            if (!findUser) {
                return res.status(409).json({
                    message: `not found, email ${findUser.email} not found`
                });
            }
            const payload = {
                user: {
                    id: findUser.id
                }
            };
            const { secretKey, expiresIn } = config.get('jwt');
            const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
            return res.status(200).json({
                message: 'accessToken',
                access_token: token
            });
        })(req, res, next);
    }
}

export default AuthController;