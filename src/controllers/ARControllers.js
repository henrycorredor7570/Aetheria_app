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

/**
 * @description Actualizar un modelo AR
 * @route PUT /augmentedreality/:id
 */

export const updateARModel = async(req,res) => {
    try {
        const {id} = req.params;
        if(isNaN(id)) return res.status(400).json({error:"El ID debe ser un número."});
        const { modelURL, type, metadata, destinationID, pointID } = req.body;
        const arModel = await ARModel.findByPk(id);
        await arModel.update({
            model_url:modelURL || arModel.model_url,
            type:type || arModel.type,
            metadata:metadata || arModel.metadata,
            destination_id:destinationID || arModel.destination_id,
            point_of_interest_id:pointID || arModel.point_of_interest_id
        });
        res.status(200).json(arModel);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

/**
 * @route DELETE /augmentedreality/:id
 * @description Ruta para eliminar un registro de AR
 */
export const deteteARModel = async(req,res) => {
    try {
        const {id} = req.params;
        if(isNaN(id)) return res.status(400).json({error: "El ID debe ser un número."});
        const deletedAR = await ARModel.findByPk(id);
        if(!deletedAR) return res.status(404).json({error:"El registro no fue encontrado en la base de datos."})
        await deletedAR.destroy();
        res.status(200).json({message:"El registro ha sido eliminado correctamente."})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}