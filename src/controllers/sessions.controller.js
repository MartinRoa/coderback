class SessionsController {
    gitHubCallback(req, res) {
        req.session.user = req.user;
        res.redirect('/');
    }

    currentSession(req, res) {
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
        req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, role: req.user.role };
        
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
            req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, age: req.user.age, role: req.user.role };
        
            return res.redirect('/products');
    }

    failRegister(req, res) {
        return res.status(400).render('error', { error: 'No se pudo crear el usuario. Intente con otro email.' });
    }

    showProfile(req, res) {
        const user = { firstName: req.session.user.firstName, email: req.session.user.email, isAdmin: (req.session.user.role === "admin") ? true : false };
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