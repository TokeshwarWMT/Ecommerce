import express from 'express'
const router = express.Router();

import { user } from '../controller/userController';
import { login } from '../controller/userController';

import { product } from '../controller/productController';
import { findOneProduct } from '../controller/productController';
import { getAllProduct } from '../controller/productController';
import { updateProduct } from '../controller/productController';
import { deleteProduct } from '../controller/productController';

import { cart } from '../controller/cartControll';
import { getCart } from '../controller/cartControll';
import { getAllCart } from '../controller/cartControll';
import { updateCart } from '../controller/cartControll';
import { deleteCart } from '../controller/cartControll';
import { addProduct } from '../controller/cartControll';
import { filterProduct } from '../controller/productController';

import { authentication } from '../middleware/auth';
import { productAuthorization } from '../middleware/auth';
import { cartAuthorization } from '../middleware/auth';
import { userValidation } from '../middleware/validation';
import { productValidation } from '../middleware/validation';
import { cartValidation } from '../middleware/validation'

router.post('/createUser', userValidation(), user);
router.post('/userLogin', login);

router.post('/createProduct', productValidation(), authentication, product);
router.get('/getProductById/:productId', authentication, findOneProduct);
router.get('/getAllProduct', authentication, getAllProduct);
router.put('/updateProduct/:productId', authentication, productAuthorization, updateProduct);
router.delete('/deleteProduct/:productId', authentication, productAuthorization, deleteProduct);
router.get('/filterProduct', authentication, filterProduct);

router.post('/createCart', cartValidation(), authentication, cart);
router.get('/getCartById/:cartId', authentication, getCart);
router.get('/getAllCart', authentication, getAllCart);
router.put('/updateCart/:cartId', authentication, cartAuthorization, updateCart);
router.delete('/deleteCart/:cartId', authentication, cartAuthorization, deleteCart);
router.post('/addProduct/:cartId', addProduct)

export default router;