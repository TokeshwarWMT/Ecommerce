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
exports.filterProduct = exports.deleteProduct = exports.updateProduct = exports.getAllProduct = exports.findOneProduct = exports.product = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const express_validator_1 = require("express-validator");
function product(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let data = req.body;
            const product = yield productModel_1.default.create(data);
            return res.status(201).send({ status: true, message: 'successful', data: product });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.product = product;
;
function findOneProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.productId;
            const product = yield productModel_1.default.findById(id).populate('userId');
            if (!product) {
                return res.status(400).send({ status: false, message: 'product does not exist..' });
            }
            ;
            return res.status(200).send({ status: true, message: 'successful', productDetails: product });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.findOneProduct = findOneProduct;
;
function getAllProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield productModel_1.default.find();
            return res.status(200).send({ status: false, message: 'successful', productDetails: product });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getAllProduct = getAllProduct;
;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = req.body;
            let id = req.params.productId;
            const product = yield productModel_1.default.findByIdAndUpdate(id, { $set: data }, { new: true });
            return res.status(200).send({ status: false, message: 'successful', productDetails: product });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updateProduct = updateProduct;
;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.productId;
            const product = yield productModel_1.default.findByIdAndRemove(id);
            if (!product) {
                return res.status(200).send({ status: false, message: 'product is already deleted..' });
            }
            ;
            return res.status(200).send({ status: false, message: 'successfully deleted..' });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.deleteProduct = deleteProduct;
;
function filterProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let filter = req.query;
            const product = yield productModel_1.default.find(filter);
            if (product) {
                return res.status(200).send({ status: true, message: 'successfull..', productDetails: product });
            }
            else {
                return res.status(400).send({ status: false, message: 'Product not found..' });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.filterProduct = filterProduct;
;
