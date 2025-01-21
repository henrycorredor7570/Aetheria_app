import { Destination, User, Visit } from "../db.js";

export const getAllVisits = async (req, res) => {
    try {
        const allVisits = await Visit.findAll({
            include: [
                { model:User, as:"user", attributes: ["id", "username"] },
                { model:Destination, as:"destination", attributes: ["id", "name"]}
            ]
        });
        res.status(200).json(allVisits);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getVisitById = async (req, res) => {
    const { id } = req.params;
    try {
        if(isNaN(id)) return res.status(400).json({error:"El ID proporcionado no es un número"});
        const visit = await Visit.findByPk(id,{
            include: [
                {model:User, as:"user", attributes:["username"]},
                {model:Destination, as:"destination", attributes: ["name"]}
            ]
        });
        if(!visit) return res.status(404).json({error:"Visita no encontrada en la base de datos"});
        res.status(200).json(visit);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const createVisit = async (req,res) => {
    try {
        const { visit_date, userId, destinationId } = req.body;
        if(!visit_date || !userId || !destinationId) return res.status(400).json({error:"Falta algún dato"})
        const visit = await Visit.findOrCreate({
            visit_date,
            user_id: userId,
            destination_id: destinationId
        })
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}