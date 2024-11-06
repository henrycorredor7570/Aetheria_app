import { Router } from "express";
import  { getDestinations, createDestination }  from "../controllers/destinationsController.js";
const destinationsRouter = Router();

destinationsRouter.get("", getDestinations);
destinationsRouter.post("", createDestination);

export default destinationsRouter;