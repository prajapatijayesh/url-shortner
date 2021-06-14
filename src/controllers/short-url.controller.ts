/**
 * 
 */

import { NextFunction, Request, Response } from "express";

import ShortURLService from "@/services/short-url.service";

class ShortURLController {
    public shortURLService = new ShortURLService();

    public shorten = async (req: Request, res: Response, next: NextFunction) => {
        const { url } = req.body;
        try {
            const ShortURLdata = await this.shortURLService.shorten(url);
            return res.status(200).json({
                data: ShortURLdata,
                message: 'success'
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public fetchByCode = async (req: Request, res: Response, next: NextFunction) => {
        const code = req.params.code;
        try {
            const ShortURLdata = await this.shortURLService.fetch(code);
            return res.status(200).json({
                data: ShortURLdata,
                message: 'success'
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default ShortURLController;