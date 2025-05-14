import { Router } from "express";
const usersRouter = Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser} from '../controllers/usersController.js'

usersRouter.get("", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("", createUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.post("/login", loginUser);

export default usersRouter;