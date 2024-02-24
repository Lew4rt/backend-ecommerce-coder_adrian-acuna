import Router from "express";
import UsersDAO from "../dao/users.dao.js";
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const routerSessions = Router()

// Utilizo una librería para facilitar la validación de un usuario e incrementar la seguridad.
const validateUserInput = [
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('age').isInt({ min: 1 }),
    body('password').isLength({ min: 6 }),
];

routerSessions.post("/register", validateUserInput, async (req, res) => {
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

        // Implemento una librería para el hashing del password
        const hashedPassword = await bcrypt.hash(password, 10);
        await UsersDAO.add(first_name, last_name, age, email, hashedPassword);
        return res.redirect("/sessions/login");
    } catch (error) {
        console.error("Error in user registration:", error.message);
        return res.status(500).redirect("/sessions/register");
    }
});

const validateLoginInput = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
];

routerSessions.post("/login", validateLoginInput, async (req, res) => {
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
            req.session.user = user._id;
            return res.redirect("/products");
        } else {
            return res.status(400).json({ error: 'Password inválido' });
        }
    } catch (error) {
        console.error("Error in user login:", error.message);
        return res.status(500).redirect("/sessions/login");
    }
});

routerSessions.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/sessions/login");
    })
})

export default routerSessions;