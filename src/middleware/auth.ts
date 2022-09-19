import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Cart from "../model/cartModel";
import Product from "../model/productModel";
import { iProduct, idecodedToken } from "../interfaces/interface";
import { iCart, iDecodedToken } from "../interfaces/interface";

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


export async function productAuthorization(req: Request, res: Response, next: NextFunction) {

    try {

        let token: any = req.headers['x-api-key'];
        let key: string = process.env.SECRET_KEY as string;
        let decodedToken = jwt.verify(token, key) as iDecodedToken;
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


export async function cartAuthorization(req: Request, res: Response, next: NextFunction) {
    
    try {

        let token: any = req.headers['x-api-key'];
        let key: string = process.env.SECRET_KEY as string;
        let decodedToken = jwt.verify(token, key) as idecodedToken;
        let loggingIn = req.params.cartId;
        let loggedIn = decodedToken.id;
        const value = await Cart.findById(loggingIn) as iCart;
        if (!value) {
            return res.status(400).send({ status: false, message: 'cart not found..' })
        };

        if (value.userId.toString() !== loggedIn) {
            return res.status(400).send({ status: false, message: 'you can not access..' })
        }
        next()

    } catch (error) {
        console.log(error)
    }
};

