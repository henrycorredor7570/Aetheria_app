import { Router } from "express";
const usersRouter = Router();
import getAllUsers from './../controllers/usersController.js'

usersRouter.get('/allUsers', getAllUsers);

export default usersRouter;