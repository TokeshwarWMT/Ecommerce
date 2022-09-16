import Product from '../model/productModel';
import { Request, Response } from 'express';

export async function product(req: Request, res: Response) {
    try {
        let data = req.body;
        const product = await Product.create(data);
        return res.status(201).send({ status: true, message: 'successful', data: product });
    } catch (error) {
        console.log(error)
    }
};


export async function findOneProduct(req: Request, res: Response) {
    try {
        let id = req.params.productId;
        const product = await Product.findById(id).populate('authorId');
        if (!product) {
            return res.status(400).send({ status: false, message: 'product does not exist..' })
        };
        return res.status(200).send({ status: true, message: 'successful', productDetails: product })
    } catch (error) {
        console.log(error)
    }
};


export async function getAllProduct(req: Request, res: Response) {
    try {
        const product = await Product.find();
        return res.status(200).send({ status: false, message: 'successful', productDetails: product })
    } catch (error) {
        console.log(error)
    }
};


export async function updateProduct(req: Request, res: Response) {
    try {
        let data = req.body;
        let id = req.params.productId;

        const product = await Product.findByIdAndUpdate(id, { $set: data }, { new: true });
        return res.status(200).send({ status: false, message: 'successful', productDetails: product })
    } catch (error) {
        console.log(error)
    }
};


export async function deleteProduct(req: Request, res: Response) {
    try {
        let id = req.params.productId;

        const product = await Product.findByIdAndRemove(id);
        if (!product) {
            return res.status(200).send({ status: false, message: 'product is already deleted..' });
        };
        return res.status(200).send({ status: false, message: 'successfully deleted..' });
    } catch (error) {
        console.log(error)
    }
};


