import { ARModel, Destination, PointOfInterest } from "../db.js"

/**
 * @desc Obtener todos los modelos AR
 * @route GET /augmentedreality
 */
export const getAllAR = async (req,res) => {
    try {
        const allAR = await ARModel.findAll({
            include: [
                {model:Destination, "as":"destination", attributes: ["name"]},
                {model:PointOfInterest, "as":"pointsOfInterest", attributes: ["name"]}
            ]
        });
        if(!allAR) res.status(404).json({error:"AR models no encontrados"});
        res.status(200).json(allAR);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

/**
 * @desc Obtener un modelo AR por su ID
 * @route GET /augmentedreality/:id
 */

export const getARById = async(req,res) => {
    try {
        const {id} = req.params;
        if(isNaN(id)) return res.status(400).json({error:"El ID debe ser un número."});
        const AR = await ARModel.findByPk(id, {
            include: [
                {model:Destination, "as":"destination", attributes: ["name"]},
                {model:PointOfInterest, "as":"pointsOfInterest", attributes: ["name"]}
            ]
        });
        if(!AR) return res.status(404).json({error:"No se encontro ningún registro asociado a ese ID."});
        res.status(200).json(AR);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

/**
 * @desc Crear un modelo AR
 * @route POST /augmentedreality
 */
export const createAR = async(req,res) => {
    try {
        const { modelURL, type, metadata, destinationID, pointID } = req.body; 
        if(!modelURL || !type || !destinationID || !pointID ) return res.status(400).json({error:"Faltan datos por agregar."});
        const destination = await Destination.findByPk(destinationID);
        if(!destination) return res.status(404).json({error:"No existe el destino asociado"});
        const point = await PointOfInterest.findByPk(pointID);
        if(!point) return res.status(404).json({error:"No se encontro el punto de interés asociado."});
        const AR = await ARModel.create({
            model_url: modelURL,
            type,
            metadata,
            destination_id:destinationID,
            point_of_interest_id:pointID
        });
        res.status(200).json(AR);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}