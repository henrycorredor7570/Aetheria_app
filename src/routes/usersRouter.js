import { Router } from "express";
const usersRouter = Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser} from '../controllers/usersController.js'
import { authMiddleware } from "./../middlewares/authMiddleware.js";

usersRouter.get("", authMiddleware, getAllUsers);
usersRouter.get("/:id", authMiddleware, getUserById);
usersRouter.post("", createUser);
usersRouter.put("/:id", authMiddleware, updateUser);
usersRouter.delete("/:id", authMiddleware, deleteUser);
usersRouter.post("/login", loginUser);

export default usersRouter;