import { Router } from "express";
import { isAdmin, isUser } from '../middlewares/auth.js';
import passport from "passport";

const authHTMLRouter = Router();

// ENDPOINTS LOG IN/LOG OUT WITH MONGODB

authHTMLRouter.get('/login', (req, res) => {
    if(req.session.user) {
        return res.redirect('/products');
    } else {
        return res.render('login', {});
    }
});

authHTMLRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).render('error', { error: 'Coloque su email y contraseña para iniciar sesión.' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, role: req.user.role };
    
    return res.redirect('/products');
});
  
authHTMLRouter.get('/faillogin', async (req, res) => {
    return res.status(401).render('error', { error: 'Los datos ingresados son incorrectos. Por favor, vuelve a intentarlo' });
});

authHTMLRouter.get('/register', (req, res) => {
    if(req.session.user) {
        return res.redirect('/products');
    }
    return res.render('register', {});
});

authHTMLRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).render('error', { error: 'Los datos ingresados son incompletos. Por favor, complete todos los campos.' });
    }
        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role };
    
        return res.redirect('/products');
});

authHTMLRouter.get('/failregister', async (req, res) => {
    return res.status(400).render('error', { error: 'No se pudo crear el usuario. Intente con otro email.' });
});

authHTMLRouter.get('/profile', isUser, (req, res) => {
    const user = { firstName: req.session.user.firstName, email: req.session.user.email, isAdmin: (req.session.user.role === "admin") ? true : false };
    return res.render('profile', { user: user });
});

authHTMLRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { error: 'No se pudo cerrar su sesión' });
        }
        return res.redirect('/auth/login');
    });
});

authHTMLRouter.get('/administration', isUser, isAdmin, (req, res) => {
    return res.send('Datos restringidos para administrador.');
});

export default authHTMLRouter;