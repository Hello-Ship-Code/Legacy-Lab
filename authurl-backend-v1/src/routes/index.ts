import { Router, Express, Response } from "express";

import { getUrlById, getUrls } from "../controllers/urls/get-urls";
import { postUrl } from "../controllers/urls/post-urls";
// import { getUsers } from "../controllers/users/get-users";
import { loginUser, signUpUser } from "../controllers/users/post-user";
import { profile, login, signup, home } from "../controllers/users/static-users";
import { errorHandler } from "../handlers/error-handlers";
import { authMiddleware } from "../middleware/authMiddleware";

const privateRouter = Router();

// Use appropriate HTTP methods
privateRouter.get('/:id', getUrlById); // GET request for fetching a URL by ID
privateRouter.get('/', getUrls); // GET request for fetching all URLs
privateRouter.post('/', postUrl); // POST request for adding a new URL

const apiRouter = Router();

apiRouter.post('/signup', signUpUser);
apiRouter.post('/login', loginUser);
apiRouter.use(authMiddleware, privateRouter)

// HTML Router

const htmlRouter = Router()

htmlRouter.get('/signup', signup);
htmlRouter.get('/login', login);
htmlRouter.get('/profile', profile);
htmlRouter.get('/', home);

// Protect routes with authMiddleware
const appRouter = (app: Express) => {
  app.use('/api', apiRouter);
  app.use('/', htmlRouter);
  app.use(errorHandler);
  app.use((_, res: Response) => {
    res.status(403).send({ status: '403 Forbidden' });
  });
};
export { appRouter };
