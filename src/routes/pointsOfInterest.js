import { Router } from "express";

import { getAllPoints, getPointById } from "../controllers/pointsOfInterestController.js";

const pointsOfInterestRouter = Router();

pointsOfInterestRouter.get("/", getAllPoints);
pointsOfInterestRouter.get("/:id", getPointById);

export default pointsOfInterestRouter;