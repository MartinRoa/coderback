import config from "../config.js";
import passport from "passport";
import { logger } from "../utils.js";

export function isActiveSession(req, res, next) {
    if (req.session?.user) {
        return next();
    }
    logger.error('Error de autenticacion!');
    return res.status(401).render('error', { error: 'Error de autenticacion!' });
}

export function isUser(req, res, next) {
    if (req.session.user._doc.role === "user" || req.session.user._doc.role === "premium") {
        return next();
    }
    logger.error('Error de autorización!');
    return res.status(403).render('error', { error: 'Error de autorización!' });
}
  
export function isAdmin(req, res, next) {
    if (req.session?.user._doc.role === "admin") {
        return next();
    }
    logger.error('Error de autorización!');
    return res.status(403).render('error', { error: 'Error de autorización!' });
}

// export function adminAuthentication(req, res, next) {
//     const { email, password } = req.body;
//     if (email === config.adminEmail && password === config.adminPassword ) {
//         req.session.user._doc = { _id: '000', email: email, firstName: "Administrador", role: "admin" };
//         return res.redirect('/products');
//     }
//     return next();
// }

export const passportLogIn = passport.authenticate('login', { failureRedirect: '/auth/faillogin' });

export const passportRegister = passport.authenticate('register', { failureRedirect: '/auth/failregister' });

export const passportGitHubAuth = passport.authenticate('github', { scope: ['user:email'] });

export const passportGitHubCallback = passport.authenticate('github', { failureRedirect: '/auth/login' });