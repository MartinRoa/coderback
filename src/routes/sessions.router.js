import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

// ENDPOINTS SESSIONS

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/auth/login' }), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

sessionsRouter.get('/current', (req, res) => {
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
});

export default sessionsRouter;