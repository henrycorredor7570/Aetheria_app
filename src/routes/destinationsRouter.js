import { Router } from "express";
import  { getDestinations, createDestination, getDestinationById, updateDestination }  from "../controllers/destinationsController.js";
const destinationsRouter = Router();

destinationsRouter.get("", getDestinations);
destinationsRouter.post("", createDestination);
destinationsRouter.get("/:id", getDestinationById);
destinationsRouter.put("/:id", updateDestination);

export default destinationsRouter;