import { Router } from "express";

import { createPointOfInterest, getAllPoints, getPointById, updatedPoint, deletedPointOfInterest, getPointsByDestination } 
        from "../controllers/pointsOfInterestController.js";

const pointsOfInterestRouter = Router();

/**
 * @route GET /pointsofinterest
 * @desc Obtener todos los puntos de interés
 * @access Público
 */
pointsOfInterestRouter.get("/", getAllPoints);

/**
 * @route GET /pointsofinterest/:id
 * @desc Obtener un punto de interés por su ID
 * @access Público
 */
pointsOfInterestRouter.get("/:id", getPointById);

/**
 * @route POST /pointsofinterest
 * @desc Crear un nuevo punto de interés
 * @access Público
 */
pointsOfInterestRouter.post("/", createPointOfInterest);

/**
 * @route PUT /pointsofinterest/:id
 * @desc Actualizar un punto de interés
 * @access Público
 */
pointsOfInterestRouter.put("/:id", updatedPoint);

/**
 * @route DELETE /pointsofinterest/:id
 * @desc Eliminar un punto de interés
 * @access Público
 */
pointsOfInterestRouter.delete("/:id", deletedPointOfInterest);

/**
 * @desc Obtener todos los puntos de inte´res de un destino específico
 * @route GET /pointsofinterest/destination/:destinationId
 */
pointsOfInterestRouter.get("/destination/:id", getPointsByDestination);

export default pointsOfInterestRouter;