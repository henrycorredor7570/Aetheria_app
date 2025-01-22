import { Router } from "express";

import { createPointOfInterest, getAllPoints, getPointById, updatedPoint } from "../controllers/pointsOfInterestController.js";

const pointsOfInterestRouter = Router();

pointsOfInterestRouter.get("/", getAllPoints);
pointsOfInterestRouter.get("/:id", getPointById);
pointsOfInterestRouter.post("/", createPointOfInterest);
pointsOfInterestRouter.put("/:id", updatedPoint);

export default pointsOfInterestRouter;