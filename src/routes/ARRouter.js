import { Router } from "express";
import { createAR, getAllAR, getARById, updateARModel, deteteARModel} from "../controllers/ARControllers.js";

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

/**
 * @route PUT /augmentedreality
 * @desc Actualizar un modelo con realidad aumentada
 * @access Público
 */
ARRouter.put("/:id", updateARModel);

/**
 * @route DELETE /augmentedreality
 * @description Eliminar un registro de realidad aumentada
 * @access Público
 */
ARRouter.delete("/:id", deteteARModel);

export default ARRouter;