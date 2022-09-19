import { check, oneOf, validationResult } from "express-validator";
import User from "../model/userModel";

export function userValidation() {
    return [check('fName').not().isEmpty().withMessage('fname is required..!!'),
    check('lName').not().isEmpty().withMessage('lname is required..!!'),
    check('mobile').not().isEmpty().withMessage('invailid email..!!'),
    check('email').isEmail().withMessage('invailid email..!!'),
    check('mobile').custom(value => {
        return User.findOne({ mobile: value }).then((user: any) => {
            if (user) {
                return Promise.reject('Mobile already in use');
            }
        })
    }),
    check('email').custom(value => {
        return User.findOne({ email: value }).then((user: any) => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password').isLength({ min: 5 }).withMessage('invailid password..!!'),
    check('address').not().isEmpty().withMessage('address is required..!!'),
    check('address.pincode').isLength({ min: 6, max: 6 }).withMessage('invailid pincode')
    ]
};

// export function userLoginValidation() {
//     return [check('email').not().isEmpty().withMessage('email is required..').isEmail().withMessage('invailid email..'),
//     check('password').not().isEmpty().withMessage('password is required..').isLength({ min: 5 }).withMessage( 'invailid password..')]
// }

// export function userLoginValidation() {
//     oneOf([check('email').exists(), check('password'). exists()])
// }


export function productValidation() {
    return [check('productName').not().isEmpty().withMessage('product name is required..!!'),
    check('userId').not().isEmpty().withMessage('userId is required..!!'),
    check('price').not().isEmpty().withMessage('price is required..!!')]
};

export function cartValidation() {
    return [check('userId').not().isEmpty().withMessage('userId is required..!!'),
    check('productId').not().isEmpty().withMessage('productId is required..!!'),
    check('price').not().isEmpty().withMessage('price is required..!!')
    ]
};




