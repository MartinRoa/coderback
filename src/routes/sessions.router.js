import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

// ENDPOINTS SESSIONS

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/login' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

sessionsRouter.get('/show', (req, res) => {
  return res.send(JSON.stringify(req.session));
});

export default sessionsRouter;