import { Request, Response } from 'express'
import User from '../model/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';

export async function user(req: Request, res: Response) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let data = req.body;
    const { fName, lName, mobile, email, password, address } = data;

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    const userData = {
        fName: fName, lName: lName, mobile: mobile, email: email, password: encryptedPassword, address: address
    };

    const user = await User.create(userData);
    return res.status(201).send({ status: false, message: 'successful..', data: user })
};


export async function login(req: Request, res: Response) {
    try {
        let email = req.body.email;
        let pass = req.body.password;


        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).send({ status: false, message: 'email is incorrect..!!' });

        const password = user?.password as string;
        const passMatch = await bcrypt.compare(pass, password);
        let key: string = process.env.SECRET_KEY as string;

        if (passMatch) {
            const token = jwt.sign({
                id: user?._id
            }, key);
            res.status(201).send({ status: true, data: token })
        } else {
            return res.status(400).send({ status: false, message: 'password is not correct..!!' })
        }

    } catch (error) {
        console.log(error)
    }
};

