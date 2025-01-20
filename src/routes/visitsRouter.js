import { Router } from "express";
const visitsRouter = Router();
import { getAllVisits } from "../controllers/visitsController.js";

visitsRouter.get("/", getAllVisits);

export default visitsRouter;