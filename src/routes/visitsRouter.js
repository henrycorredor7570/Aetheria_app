import { Router } from "express";
const visitsRouter = Router();
import { createVisit, deleteVisit, getAllVisits, getVisitById, updateVisit } from "../controllers/visitsController.js";

visitsRouter.get("/", getAllVisits);
visitsRouter.get("/:id", getVisitById);
visitsRouter.post("/", createVisit);
visitsRouter.put("/:id", updateVisit);
visitsRouter.delete("/:id", deleteVisit);

export default visitsRouter;