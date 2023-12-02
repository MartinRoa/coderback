import { Router } from "express";
import { sessionsController } from "../controllers/sessions.controller.js";
import { passportGitHubAuth, passportGitHubCallback } from "../middlewares/auth.js";

const sessionsRouter = Router();

// ENDPOINTS SESSIONS

sessionsRouter.get('/github', passportGitHubAuth);

sessionsRouter.get('/githubcallback', passportGitHubCallback, sessionsController.gitHubCallback);

sessionsRouter.get('/current', sessionsController.currentSession);

export default sessionsRouter;