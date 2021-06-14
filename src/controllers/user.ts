import { Request, Response } from "express";

export function getAllUsers (req: Request, res: Response) {
    try {
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
    }
}


// ID
// 808133427251-l0j60jnfll48vifs00ksa5nul792q8a9.apps.googleusercontent.com

// secret
// q4T4Y1tJaKowFzjpQpyShM3s