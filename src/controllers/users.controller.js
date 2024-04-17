import { validationResult, body } from 'express-validator';
import bcrypt from 'bcrypt';
import UsersDAO from '../dao/users.dao.js';
import jwt from "jsonwebtoken";
import logger from '../logs/logger.js';

const validateUserInput = [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('age').isInt({ min: 1 }),
    body('password').isLength({ min: 6 }),
];

export async function register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { first_name, last_name, email, age, password } = req.body;

    try {
        const emailUsed = await UsersDAO.getByEmail(email);

        if (emailUsed) {
            return res.status(400).json({ error: 'El email está en uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UsersDAO.add(first_name, last_name, age, email, hashedPassword);
        return res.redirect("/sessions/login");
    } catch (error) {
        logger.error("Error in user registration:", error.message);
        return res.status(500).redirect("/sessions/register");
    }
}

export { validateUserInput };

const validateLoginInput = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
];

export async function login(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await UsersDAO.getByEmail(email);

        if (!user) {
            return res.status(400).json({ error: 'Email inválido' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            let token = jwt.sign({id: user._id}, 'secret_jwt', { expiresIn: '1h' });

            res.cookie("jwt", token, {
                signed:true,
                httpOnly:true,
                maxAge: 1000*60*60
            });
            return res.redirect("/products");
        } else {
            return res.status(400).json({ error: 'Password inválido' });
        }
    } catch (error) {
        logger.error("Error in user login:", error.message);
        return res.status(500).redirect("/sessions/login");
    }
}

export { validateLoginInput };