import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import { usersController } from "../controllers/users.controller.js";

const usersHTMLRouter = Router();

// ENDPOINTS USERS HTML

usersHTMLRouter.get("/", isAdmin, usersController.showUsersList);

export default usersHTMLRouter;