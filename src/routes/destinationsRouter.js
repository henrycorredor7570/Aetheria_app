import { Router } from "express";
import  { getDestinations, createDestination, getDestinationById, updateDestination, deleteDestination }  from "../controllers/destinationsController.js";
const destinationsRouter = Router();

destinationsRouter.get("", getDestinations);
destinationsRouter.post("", createDestination);
destinationsRouter.get("/:id", getDestinationById);
destinationsRouter.put("/:id", updateDestination);
destinationsRouter.delete("/:id", deleteDestination)
 
export default destinationsRouter;