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
exports.cartAuthorization = exports.productAuthorization = exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cartModel_1 = __importDefault(require("../model/cartModel"));
const productModel_1 = __importDefault(require("../model/productModel"));
function authentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers['x-api-key'];
            if (!token) {
                res.status(400).send({ status: false, message: 'please input token..!!' });
            }
            ;
            let key = process.env.SECRET_KEY;
            let decodedToken = jsonwebtoken_1.default.verify(token, key);
            // return res.status(200).send({ status: true, data: decodedToken })
        }
        catch (error) {
            return res.status(400).send({ status: false, message: 'invailid token..!!' });
        }
        ;
        next();
    });
}
exports.authentication = authentication;
;
function productAuthorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers['x-api-key'];
            let key = process.env.SECRET_KEY;
            let decodedToken = jsonwebtoken_1.default.verify(token, key);
            let loggingIn = req.params.productId;
            let loggedIn = decodedToken.id;
            const value = yield productModel_1.default.findById(loggingIn);
            if (!value) {
                return res.status(400).send({ status: false, message: 'product not found..' });
            }
            ;
            if (value.userId.toString() !== loggedIn) {
                return res.status(400).send({ status: false, message: 'you can not access..' });
            }
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.productAuthorization = productAuthorization;
;
function cartAuthorization(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers['x-api-key'];
            let key = process.env.SECRET_KEY;
            let decodedToken = jsonwebtoken_1.default.verify(token, key);
            let loggingIn = req.params.cartId;
            let loggedIn = decodedToken.id;
            const value = yield cartModel_1.default.findById(loggingIn);
            if (!value) {
                return res.status(400).send({ status: false, message: 'cart not found..' });
            }
            ;
            if (value.userId.toString() !== loggedIn) {
                return res.status(400).send({ status: false, message: 'you can not access..' });
            }
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.cartAuthorization = cartAuthorization;
;
