import { Router } from "express";
import { userModel } from "../DAO/models/user.model.js";
import { isAdmin, isUser } from '../middlewares/auth.js';

const authHTMLRouter = Router();

// ENDPOINTS LOG IN/LOG OUT WITH MONGODB

authHTMLRouter.get('/login', (req, res) => {
    if(req.session.email) {
        return res.redirect('/products');
    }
    return res.render('login', {});
});

authHTMLRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).render('error', { error: 'Coloque su email y contraseña para iniciar sesión.' });
    }

    if (email === "adminCoder@coder.com" && password === "adminCod3r123" ){
        req.session.firstName = "Administrador";
        req.session.email = email;
        req.session.isAdmin = true;
        return res.redirect('/products');
    }

    const userFound = await userModel.findOne({ email: email });
    if (userFound && userFound.password == password) {
        req.session.firstName = userFound.firstName;
        req.session.email = userFound.email;
        req.session.isAdmin = userFound.isAdmin;

        return res.redirect('/products');
    } else {
        return res.status(401).render('error', { error: 'Los datos ingresados son incorrectos. Por favor, vuelve a intentarlo' });
    }
});

authHTMLRouter.get('/register', (req, res) => {
    if(req.session.email) {
        return res.redirect('/products');
    }
    return res.render('register', {});
});

authHTMLRouter.post('/register', async (req, res) => {
    const { firstName, lastName, age, email, password } = req.body;
    if ( !firstName || !lastName || !age || !email || !password ) {
        return res.status(400).render('error', { error: 'Los datos ingresados son incompletos. Por favor, complete todos los campos.' });
    }
    try {
        await userModel.create({ firstName: firstName, lastName: lastName, age: age, email: email, password: password, isAdmin: false });
        req.session.firstName = firstName;
        req.session.email = email;
        req.session.isAdmin = false;
  
        return res.redirect('/products');
    } catch (err) {
        return res.status(400).render('error', { error: 'No se pudo crear el usuario. Intente con otro email.' });
    }
});

authHTMLRouter.get('/profile', isUser, (req, res) => {
    const user = { firstName: req.session.firstName, email: req.session.email, isAdmin: req.session.isAdmin };
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