import UserDataSessionDTO from "../DAO/DTO/userDataSession.dto.js";

class SessionsController {
    gitHubCallback(req, res) {
        req.session.user = req.user;
        res.redirect('/');
    }

    currentSession(req, res) {
        const userDataSession = new UserDataSessionDTO(req.user);
        req.session.user = { ...userDataSession };
        if(req.session.user) {
            return res.status(200).json({
                status: "success",
                message: "Logged in user.",
                data: req.session
            });
        } else {
            return res.status(400).json({
                status: "Error",
                message: "No logged in user.",
                data: {}
            });
        }
    }

    checkLogIn(req, res) {
        if(req.session.user) {
            return res.redirect('/products');
        } else {
            return res.render('login', {});
        }
    }

    userLogIn(req, res) {
        if (!req.user) {
            return res.status(400).render('error', { error: 'Coloque su email y contraseña para iniciar sesión.' });
        }
        req.session.user = { ...req.user };
        
        return res.redirect('/products');
    }

    failLogIn(req, res) {
        return res.status(401).render('error', { error: 'Los datos ingresados son incorrectos. Por favor, vuelva a intentarlo' });
    }

    checkRegister(req, res) {
        if(req.session.user) {
            return res.redirect('/products');
        }
        return res.render('register', {});
    }

    userRegister(req, res) {
        if (!req.user) {
            return res.status(400).render('error', { error: 'Los datos ingresados son incompletos. Por favor, complete todos los campos.' });
        }
        const userDataSession = new UserDataSessionDTO(req.user);
        req.session.user = { _doc: {} }
        req.session.user._doc = {firstName: userDataSession.firstName, email: userDataSession.email, cart: userDataSession.cart, role: userDataSession.role}
        
        return res.redirect('/products');
    }

    failRegister(req, res) {
        return res.status(400).render('error', { error: 'No se pudo crear el usuario. Intente con otro email.' });
    }

    showProfile(req, res) {
        const user = { firstName: req.session.user._doc.firstName, email: req.session.user._doc.email,  isPremium: (req.session.user._doc.role === "premium") ? true : false ,isAdmin: (req.session.user._doc.role === "admin") ? true : false };
        return res.render('profile', { user: user });
    }

    logOut(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).render('error', { error: 'No se pudo cerrar su sesión' });
            }
            return res.redirect('/auth/login');
        });
    }

    showAdministrationPage(req, res) {
        return res.send('Datos restringidos para administrador.');
    }
}

export const sessionsController = new SessionsController();