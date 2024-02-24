import { Router } from "express";
import { isAdmin, isActiveSession, passportLogIn, passportRegister } from '../middlewares/auth.js';
import { sessionsController } from "../controllers/sessions.controller.js";

const authHTMLRouter = Router();

// ENDPOINTS LOG IN/LOG OUT

authHTMLRouter.get('/login', sessionsController.checkLogIn);

authHTMLRouter.post('/login', passportLogIn, sessionsController.userLogIn);
  
authHTMLRouter.get('/faillogin', sessionsController.failLogIn);

authHTMLRouter.get('/register', sessionsController.checkRegister);

authHTMLRouter.post('/register', passportRegister, sessionsController.userRegister);

authHTMLRouter.get('/failregister', sessionsController.failRegister);

authHTMLRouter.get('/profile', isActiveSession, sessionsController.showProfile);

authHTMLRouter.get('/logout', sessionsController.logOut);

authHTMLRouter.get('/administration', isActiveSession, isAdmin, sessionsController.showAdministrationPage);

export default authHTMLRouter;