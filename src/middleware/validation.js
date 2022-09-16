"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
function userValidation(req, res, next) {
    return [(0, express_validator_1.check)('fname').not().isEmpty().withMessage('fname is required..!!'),
        (0, express_validator_1.check)('lname').not().isEmpty().withMessage('lname is required..!!'),
        (0, express_validator_1.check)('mobile').not().isEmpty().withMessage('invailid email..!!'),
        (0, express_validator_1.check)('email').isEmail().withMessage('invailid email..!!'),
        (0, express_validator_1.check)('password').isLength({ min: 5 }).withMessage('invailid password..!!')];
}
exports.userValidation = userValidation;
