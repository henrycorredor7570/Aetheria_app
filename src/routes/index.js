import { Router } from "express";
import usersRouter from "./usersRouter.js"
import destinationsRouter from "./destinationsRouter.js";
import reviewsRouter from "./reviewsRouter.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/destinations", destinationsRouter);
router.use("/reviews", reviewsRouter);

export default router;
