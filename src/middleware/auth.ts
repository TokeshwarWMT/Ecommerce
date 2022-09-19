import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Product from "../model/productModel";

export async function authentication(req: Request, res: Response, next: NextFunction) {
    try {
        let token: any = req.headers['x-api-key'];
        if (!token) {
            res.status(400).send({ status: false, message: 'please input token..!!' })
        };

        let key: string = process.env.SECRET_KEY as string;
        let decodedToken = jwt.verify(token, key);
        // return res.status(200).send({ status: true, data: decodedToken })
    } catch (error) {
        return res.status(400).send({ status: false, message: 'invailid token..!!' })
    };
    next();
};


export async function authorization(req: Request, res: Response, next: NextFunction) {
    try {

        interface idecodedToken {
            id: string
        };

        interface iProduct {
            userId: string
        }

        let token: any = req.headers['x-api-key'];
        let key: string = process.env.SECRET_KEY as string;
        let decodedToken = jwt.verify(token, key) as idecodedToken;
        let loggingIn = req.params.productId;
        let loggedIn = decodedToken.id;
        const value = await Product.findById(loggingIn) as iProduct;
        if (!value) {
            return res.status(400).send({ status: false, message: 'product not found..' })
        };

        if (value.userId.toString() !== loggedIn) {
            return res.status(400).send({ status: false, message: 'you can not access..' })
        }
        next()

    } catch (error) {
        console.log(error)
    }
};

