import { Destination } from "../db.js";

export const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.findAll();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const createDestination = async (req,res) => {
    const { name, description, latitude, longitude, country, image_url } = req.body;
    try {
        if(!name || !description || !latitude || !longitude || !country){
            return res.status(400).json({error:"¡Hizo falta algún dato!"})
        }
        const destinationCreated = await Destination.create({
            name, 
            description, 
            latitude, 
            longitude, 
            country, 
            image_url
        })
        res.status(201).json(destinationCreated)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getDestinationById = async (req,res) => {
    const { id }= req.params;
    try {
        if(isNaN(id)){
            return res.status(400).json({error:"El ID debe ser un número."});
        }
        const destination = await Destination.findByPk(id);
        if(!destination){
            return res.status(404).json({error:"Destino no encontrado"});
        }
        res.status(200).json(destination);        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const updateDestination = async (req,res) => {
    const { id } = req.params;
    const { name, description, latitude, longitude, country, image_url } = req.body;
    try {
        if(isNaN(id)) return res.status(400).json({error: "El ID debe ser un número"})
        const destination = await Destination.findByPk(id);
        if(!destination) return res.status(404).json({error:"Destino no encontrado."})
        if(!name && !description && !latitude && !longitude && !country && !image_url) return res.status(400).json({error: "Proporcione al menos un campo para actualizar"})
        
        destination.name = name || destination.name;
        destination.description = description || destination.description;
        destination.latitude = latitude || destination.latitude;
        destination.longitude = longitude || destination.longitude;
        destination.country  = country || destination.country;
        destination.image_url = image_url || destination.image_url;
        
        await destination.save();
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteDestination = async (req,res) => {
    const { id } = req.params;
    try {
        if(isNaN(id)) return res.status(400).json({error:"El ID debe ser un número."});
        const destination = await Destination.findByPk(id);
        if (!destination) return res.status(404).json({error:"Destino no encontrado"});
        await destination.destroy();
        res.status(200).json("Destino eliminado con éxito");
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}