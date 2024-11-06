import { Destination } from "../db.js";

export const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll();
        console.log(destinations);
        res.status(200).json(destinations);
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const createDestination = async (req,res) => {
    const { name, description, latitude, longitude, country, image_url } = req.body;
    try {
        const destinationCreated = await Destination.create({
            name, 
            description, 
            latitude, 
            longitude, 
            country, 
            image_url
        })
        res.status(200).json(destinationCreated)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}