import { Router } from "express";

import { createPointOfInterest, getAllPoints, getPointById, updatedPoint, deletedPointOfInterest } from "../controllers/pointsOfInterestController.js";

const pointsOfInterestRouter = Router();

pointsOfInterestRouter.get("/", getAllPoints);
pointsOfInterestRouter.get("/:id", getPointById);
pointsOfInterestRouter.post("/", createPointOfInterest);
pointsOfInterestRouter.put("/:id", updatedPoint);
pointsOfInterestRouter.delete("/:id", deletedPointOfInterest);

export default pointsOfInterestRouter;