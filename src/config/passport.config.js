import passport from 'passport'
import GitHubStrategy from 'passport-github2'
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
                const result = await UsersDAO.add(profile._json.name, '', 18, profile._json.email, '', false);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));
}

export default initializePassport