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