import { Router } from "express";
import { createAR, getAllAR, getARById } from "../controllers/rAControllers.js";

const ARRouter = Router();

/**
 * @route GET /augmentedreality
 * @desc Obtener todos los modelos AR
 * @access Público
 */
ARRouter.get("/", getAllAR);

/**
 * @route GET /augmentedreality/:id
 * @desc Obtener modelos AR por ID
 * @access Público
 */
ARRouter.get("/:id", getARById);

/**
 * @route POST /augmentedreality
 * @desc Crear un modelo con realidad aumentada
 * @access Público
 */
ARRouter.post("/", createAR);

export default ARRouter;