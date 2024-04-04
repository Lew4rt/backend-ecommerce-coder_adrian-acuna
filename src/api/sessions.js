import Router from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, validateUserInput, login, validateLoginInput } from '../controllers/users.controller.js';

const routerSessions = Router()

routerSessions.post("/register", validateUserInput, register);

routerSessions.post("/login", validateLoginInput, login);

routerSessions.get("/current", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.json(req.user);
});

routerSessions.get("/logout", (req, res) => {
    res.clearCookie("jwt").redirect("/sessions/login");
});

routerSessions.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

routerSessions.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    async function (req, res) {
        const user = req.user;
        if (user) {
            const token = jwt.sign({ id: user._id }, 'secret_jwt', { expiresIn: '1h' });

            res.cookie("jwt", token, {
                signed: true,
                httpOnly: true,
                maxAge: 1000 * 60 * 60
            });

            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    }
);

export default routerSessions;