import { Router } from "express";
import usersRouter from "./usersRouter.js"
import destinationsRouter from "./destinationsRouter.js";
import reviewsRouter from "./reviewsRouter.js";
import visitsRouter from "./visitsRouter.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/destinations", destinationsRouter);
router.use("/reviews", reviewsRouter);
router.use("/visits", visitsRouter);

export default router;
