import { PointOfInterest, Destination } from "../db.js"

/**
 * @desc Obtener todos los puntos de interés
 * @route GET /pointsofinterest
 */
export const getAllPoints = async (req,res) => {
    try {
        const allPoints = await PointOfInterest.findAll({
            include: [
                {model:Destination, as:"destination", attributes: ["name"]}
            ]
        });
        if(!allPoints) return res.status(404).json({message:"No hay puntos de interes registrados."});
        res.status(200).json(allPoints);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

/**
 * @desc Obtener un punto de interés por su ID
 * @route GET /pointsofinterest/:id
 */
export const getPointById = async(req,res) => {
    try {
        const {id} = req.params;
        if(isNaN(id)) return res.status(400).json({error:"El ID debe ser un número."});
        const point = await PointOfInterest.findByPk(id,
            {
                include: [
                    {model:Destination, as: "destination", attributes: ["name"]}
                ]
            }
        );
        if(!point) return res.status(404).json({error:"No existe el punto de interes."});
        res.status(200).json(point);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

/**
 * @desc Crear un nuevo punto de interés
 * @route POST /pointsofinterest
 */
export const createPointOfInterest = async (req,res) => {
    try {
        const { name, description, latitude, longitude, type, destinationID } = req.body;
        if(!name || !latitude || !longitude || !type || !destinationID) return res.status(400).json({error:"Falta algún dato por agregar."});
        const destination = await Destination.findByPk(destinationID);
        if(!destination) return res.status(404).json({error:"Destino no encontrado en la base de datos."});
        const newPoint = await PointOfInterest.create({
            name,
            description,
            latitude,
            longitude,
            type,
            destination_id: destinationID
        });
        return res.status(200).json(newPoint);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


/**
 * @desc Actualizar un punto de interés
 * @route PUT /pointsofinterest/:id
 */
export const updatedPoint = async(req,res) => {
    try {
        const {id} = req.params;
        const {name, description, latitude, longitude, type, destinationId} = req.body;
        if(isNaN(id)) return res.status(400).json({error:"El ID debe ser un número."});
        const point = await PointOfInterest.findByPk(id);
        if(!point) return res.status(404).json({error:"Punto de interés no encontrado."});
        const updatedPoint = await point.update({
            name:name || point.name,
            description:description || point.description,
            latitude:latitude || point.latitude,
            longitude:longitude || point.longitude,
            type:type || point.type,
            destination_id: destinationId || point.destination_id
        });
        res.status(200).json(updatedPoint);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

/**
 * @desc Eliminar un punto de interés
 * @route DELETE /pointsofinterest/:id
 */