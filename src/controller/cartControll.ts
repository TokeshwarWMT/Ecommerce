import { Request, Response } from 'express';
import Cart from '../model/cartModel';
import { validationResult } from 'express-validator';
import Product from '../model/productModel';


export async function cart(req: Request, res: Response) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let data = req.body;
        const cart = await Cart.create(data);
        return res.status(201).send({ status: false, message: 'successful..', cartDetails: cart })
    } catch (error) {
        console.log(error)
    }
};


export async function getCart(req: Request, res: Response) {
    try {
        let id = req.params.cartId;
        const cart = await Cart.findById(id).populate('authorId', 'productId');
        if (!cart) {
            return res.status(400).send({ status: false, message: 'cart does not exist..' })
        };
        return res.status(200).send({ status: true, message: 'successful..', cartDetails: cart })
    } catch (error) {

    }
};


export async function getAllCart(req: Request, res: Response) {
    try {
        const cart = await Cart.find();
        return res.status(200).send({ status: true, message: 'successful..', cartDetails: cart })
    } catch (error) {
        console.log(error)
    }
};


export async function updateCart(req: Request, res: Response) {
    try {
        let data = req.body;
        let id = req.params.cartId;

        const cart = await Cart.findByIdAndUpdate(id, { $set: data }, { new: true });
        return res.status(201).send({ status: true, message: 'successful..', cartDetails: cart })
    } catch (error) {
        console.log(error)
    }
};


export async function deleteCart(req: Request, res: Response) {
    try {
        let id = req.params.cartId;

        const cart = await Cart.findByIdAndRemove(id);
        if (!cart) {
            return res.status(400).send({ status: false, message: 'cart is already deleted..' })
        };
        return res.status(200).send({ status: true, message: 'successful..' })
    } catch (error) {
        console.log(error)
    }
};


export async function addProduct(req: Request, res: Response) {
    try {
        // let productId = req.body;
        const { productId } = req.body;
        // let cartId = req.params;
        const { cartId } = req.params
        if (productId.match(/^[0-9a-fA-F]{24}$/)) {
            console.log('valid')
        }
        const product = await Product.findById(productId);
        const cart = await Cart.findById(cartId);
        cart?.productId.push(productId)
        if (product?.price && cart && product.quantity)
            cart.total += product?.price * product?.quantity;

    } catch (error) {
        console.log(error)
    }
};
