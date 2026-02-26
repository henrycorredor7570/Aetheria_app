import { Destination, ARModel} from "../db.js";
import { Op } form "sequelize";
/**
 * @desc Obtener destinos con opción de búsqueda
 * @route GET /destinations?search=nombre
 * @param {string} search - Término de búsqueda (opcional)
 * @access Público
 */
export const getDestinations = async (req, res) => {
    try {
        // Obtenemos el parámetro 'search' de la query string
        const {search} = req.query;
    
        let destinations;

        if(search && search.trim()){
            // Si hay un término de búsqueda, filtramos por nombre, descripción o país
            destinations = await Destination.findAll({
                where: {
                    [require('sequelize').Op.or]: [
                        { name: { [require('sequelize').Op.iLike]: `%${search}%` } },
                        { description: { [require('sequelize').Op.iLike]: `%${search}%` } },
                        { country: { [require('sequelize').Op.iLike]: `%${search}%` } }
                    ]
                }
            });

        } else {
            // Si no hay búsqueda, traemos todos los destinos
            destinations = await Destination.findAll();
        }
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
        //Incluimos los modelos AR relacionados al destino:
        const destination = await Destination.findByPk(id,{
            include: [
                {
                    model:ARModel,
                    as:"arModels"
                }
            ]
        });
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