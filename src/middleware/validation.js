"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidation = exports.productValidation = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
const userModel_1 = __importDefault(require("../model/userModel"));
function userValidation() {
    return [(0, express_validator_1.check)('fName').not().isEmpty().withMessage('fname is required..!!'),
        (0, express_validator_1.check)('lName').not().isEmpty().withMessage('lname is required..!!'),
        (0, express_validator_1.check)('mobile').not().isEmpty().withMessage('invailid email..!!'),
        (0, express_validator_1.check)('email').isEmail().withMessage('invailid email..!!'),
        (0, express_validator_1.check)('mobile').custom(value => {
            return userModel_1.default.findOne({ mobile: value }).then((user) => {
                if (user) {
                    return Promise.reject('Mobile already in use');
                }
            });
        }),
        (0, express_validator_1.check)('email').custom(value => {
            return userModel_1.default.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        }),
        (0, express_validator_1.check)('password').isLength({ min: 5 }).withMessage('invailid password..!!'),
        (0, express_validator_1.check)('address').not().isEmpty().withMessage('address is required..!!'),
        (0, express_validator_1.check)('address.pincode').isLength({ min: 6, max: 6 }).withMessage('invailid pincode')];
}
exports.userValidation = userValidation;
;
// export function userLoginValidation() {
//     return [check('email').not().isEmpty().withMessage('email is required..').isEmail().withMessage('invailid email..'),
//     check('password').not().isEmpty().withMessage('password is required..').isLength({ min: 5 }).withMessage( 'invailid password..')]
// }
// export function userLoginValidation() {
//     oneOf([check('email').exists(), check('password'). exists()])
// }
function productValidation() {
    return [(0, express_validator_1.check)('productName').not().isEmpty().withMessage('product name is required..!!'),
        (0, express_validator_1.check)('userId').not().isEmpty().withMessage('userId is required..!!'),
        (0, express_validator_1.check)('price').not().isEmpty().withMessage('price is required..!!')];
}
exports.productValidation = productValidation;
;
function cartValidation() {
    return [(0, express_validator_1.check)('userId').not().isEmpty().withMessage('userId is required..!!'),
        (0, express_validator_1.check)('productId').not().isEmpty().withMessage('productId is required..!!'),
        (0, express_validator_1.check)('price').not().isEmpty().withMessage('price is required..!!')
    ];
}
exports.cartValidation = cartValidation;
;
