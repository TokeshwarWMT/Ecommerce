"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.deleteCart = exports.updateCart = exports.getAllCart = exports.getCart = exports.cart = void 0;
const cartModel_1 = __importDefault(require("../model/cartModel"));
const express_validator_1 = require("express-validator");
const productModel_1 = __importDefault(require("../model/productModel"));
function cart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let data = req.body;
            const cart = yield cartModel_1.default.create(data);
            return res.status(201).send({ status: false, message: 'successful..', cartDetails: cart });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.cart = cart;
;
function getCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.cartId;
            const cart = yield cartModel_1.default.findById(id).populate('authorId', 'productId');
            if (!cart) {
                return res.status(400).send({ status: false, message: 'cart does not exist..' });
            }
            ;
            return res.status(200).send({ status: true, message: 'successful..', cartDetails: cart });
        }
        catch (error) {
        }
    });
}
exports.getCart = getCart;
;
function getAllCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cart = yield cartModel_1.default.find();
            return res.status(200).send({ status: true, message: 'successful..', cartDetails: cart });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getAllCart = getAllCart;
;
function updateCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = req.body;
            let id = req.params.cartId;
            const cart = yield cartModel_1.default.findByIdAndUpdate(id, { $set: data }, { new: true });
            return res.status(201).send({ status: true, message: 'successful..', cartDetails: cart });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updateCart = updateCart;
;
function deleteCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.cartId;
            const cart = yield cartModel_1.default.findByIdAndRemove(id);
            if (!cart) {
                return res.status(400).send({ status: false, message: 'cart is already deleted..' });
            }
            ;
            return res.status(200).send({ status: true, message: 'successful..' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.deleteCart = deleteCart;
;
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // let productId = req.body;
            const { productId } = req.body;
            // let cartId = req.params;
            const { cartId } = req.params;
            if (productId.match(/^[0-9a-fA-F]{24}$/)) {
                console.log('valid');
            }
            const product = yield productModel_1.default.findById(productId);
            const cart = yield cartModel_1.default.findById(cartId);
            cart === null || cart === void 0 ? void 0 : cart.productId.push(productId);
            if ((product === null || product === void 0 ? void 0 : product.price) && cart && product.quantity)
                cart.total += (product === null || product === void 0 ? void 0 : product.price) * (product === null || product === void 0 ? void 0 : product.quantity);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.addProduct = addProduct;
;
