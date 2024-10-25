import { Router } from "express";
const usersRouter = Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController.js'

usersRouter.get("", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("", createUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;