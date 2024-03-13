// Segunda entrega integradora: El hecho de crear un directorio passport con diferentes archivos para cada strategy me trajo inconvenientes,
// por lo que decidí implementar todos en el mismo file passport.config.js
import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import { Strategy as JWTStrategy } from 'passport-jwt';
import UsersDAO from '../dao/users.dao.js'
import dotenv from 'dotenv'

dotenv.config();
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

const initializePassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await UsersDAO.getByID(id)
        done(null, user);
    });

    passport.use('github', new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Es importante tener en cuenta que el perfil de github debe tener su email público.
            const user = await UsersDAO.getByEmail(profile._json.email);
            if (!user) {
                const result = await UsersDAO.add(profile._json.name, '', 18, profile._json.email, '');
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: (req) => {
            var token = null;
            if (req && req.signedCookies) {
                token = req.signedCookies['jwt'];
            }
            return token;
        },
        secretOrKey: "secret_jwt"
    }, async function(jwt_payload, done){
        let userId = jwt_payload.id;
        let user = await UsersDAO.getByID(userId);
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}

export default initializePassport