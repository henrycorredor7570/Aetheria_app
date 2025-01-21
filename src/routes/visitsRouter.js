import { Router } from "express";
const visitsRouter = Router();
import { createVisit, getAllVisits, getVisitById } from "../controllers/visitsController.js";

visitsRouter.get("/", getAllVisits);
visitsRouter.get("/:id", getVisitById);
visitsRouter.post("/", createVisit);

export default visitsRouter;