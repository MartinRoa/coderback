import { Router } from "express";
import { isAdmin, isUser, adminAuthentication, passportLogIn, passportRegister } from '../middlewares/auth.js';
import { sessionsController } from "../controllers/sessions.controller.js";

const authHTMLRouter = Router();

// ENDPOINTS LOG IN/LOG OUT WITH MONGODB

authHTMLRouter.get('/login', sessionsController.checkLogIn);

authHTMLRouter.post('/login', adminAuthentication, passportLogIn, sessionsController.userLogIn);
  
authHTMLRouter.get('/faillogin', sessionsController.failLogIn);

authHTMLRouter.get('/register', sessionsController.checkRegister);

authHTMLRouter.post('/register', passportRegister, sessionsController.userRegister);

authHTMLRouter.get('/failregister', sessionsController.failRegister);

authHTMLRouter.get('/profile', isUser, sessionsController.showProfile);

authHTMLRouter.get('/logout', sessionsController.logOut);

authHTMLRouter.get('/administration', isUser, isAdmin, sessionsController.showAdministrationPage);

export default authHTMLRouter;