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
