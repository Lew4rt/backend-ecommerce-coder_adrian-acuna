import Router from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, validateUserInput, login, validateLoginInput, resetPwRequest, validateEmailInput, resetPw, validatePasswordInput } from '../controllers/users.controller.js';
import logger from "../logs/logger.js";

const routerSessions = Router()

routerSessions.post("/register", validateUserInput, register);

routerSessions.post("/login", validateLoginInput, login);

routerSessions.get("/current", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.json(req.user);
});

routerSessions.get("/logout", (req, res) => {
    logger.info("User logging out")
    res.clearCookie("jwt").redirect("/sessions/login");
});

routerSessions.post("/requestResetPw", validateEmailInput, resetPwRequest)

routerSessions.post("/resetPw/:token/:iv", validatePasswordInput, resetPw)

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