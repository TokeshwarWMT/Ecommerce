"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidation = exports.productValidation = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
function userValidation() {
    return [(0, express_validator_1.check)('fName').not().isEmpty().withMessage('fname is required..!!'),
        (0, express_validator_1.check)('lName').not().isEmpty().withMessage('lname is required..!!'),
        (0, express_validator_1.check)('mobile').not().isEmpty().withMessage('invailid email..!!'),
        (0, express_validator_1.check)('email').isEmail().withMessage('invailid email..!!'),
        (0, express_validator_1.check)('password').isLength({ min: 5 }).withMessage('invailid password..!!')];
}
exports.userValidation = userValidation;
;
function productValidation() {
    return [(0, express_validator_1.check)('productName').not().isEmpty().withMessage('product name is required..!!'),
        (0, express_validator_1.check)('authorId').not().isEmpty().withMessage('authorId is required..!!'),
        (0, express_validator_1.check)('price').not().isEmpty().withMessage('price is required..!!').custom];
}
exports.productValidation = productValidation;
;
function cartValidation() {
    return [(0, express_validator_1.check)('authorId').not().isEmpty().withMessage('authorId is required..!!'),
        (0, express_validator_1.check)('productId').not().isEmpty().withMessage('productId is required..!!'),
        (0, express_validator_1.check)('price').not().isEmpty().withMessage('price is required..!!')
    ];
}
exports.cartValidation = cartValidation;
;
