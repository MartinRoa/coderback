import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import { usersController } from "../controllers/users.controller.js";

const usersRouter = Router();

// ENDPOINTS USERS

usersRouter.get("/", isAdmin, usersController.getUsers);

usersRouter.put("/:uid", isAdmin, usersController.changeUserRole);

usersRouter.delete("/:uid", isAdmin, usersController.deleteUser);

export default usersRouter;