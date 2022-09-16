import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export async function authentication(req: Request, res: Response, next: NextFunction) {
    try {
        let token: any = req.headers['x-api-key'];
        if (!token) {
            res.status(400).send({ status: false, message: 'please input token..!!' })
        };

        let key: string = 'webmobtech';
        let decodedToken = jwt.verify(token, key);
        // return res.status(200).send({ status: true, data: decodedToken })
    } catch (error) {
        return res.status(400).send({ status: false, message: 'invailid token..!!' })
    };
    next();
};