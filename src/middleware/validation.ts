import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export function userValidation(req: Request, res: Response, next: NextFunction) {
    return [check('fname').not().isEmpty().withMessage('fname is required..!!'),
    check('lname').not().isEmpty().withMessage('lname is required..!!'),
    check('mobile').not().isEmpty().withMessage('invailid email..!!'),
    check('email').isEmail().withMessage('invailid email..!!'),
    check('password').isLength({ min: 5 }).withMessage('invailid password..!!')] }






