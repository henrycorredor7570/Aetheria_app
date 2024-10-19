import { Router } from "express";
const router = Router();

import usersRouter from "./usersRouter.js"

router.use("/users", usersRouter);


export default router;
