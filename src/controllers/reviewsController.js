import { Destination, Review, User } from "../db.js";

export const getAllReviews = async (req,res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                { model: User, as: "user", attributes:["id","username"]},
                { model: Destination, as: "destination", attributes:["id","name"]}
            ]
        });
        if(!reviews) res.status(404).json({error:"No se encontraron reseñas"})
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getReviewById = async (req,res) => {
    const { id } = req.params;
    try {
        if(isNaN(id)) return res.status(400).json({error:"El ID debe de ser un número."});
        const review = await Review.findByPk(id,{
            include: [
                { model: User, as: "user", attributes:["username"]},
                { model: Destination, as: "destination", attributes:["name"]}
            ]
        });
        if(!review) return res.status(404).json({error: "Reseña no encontrada en la base de datos."});
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const createReview = async(req,res) => {
    const { rating, comment, visit_date, userId, destinationId } = req.body;
    try {
        if(!rating || !comment || !visit_date || !userId || !destinationId){
            return res.status(400).json({error: "Faltan datos por agregar."})
        }
        if(rating < 0 || rating > 5){
            return res.status(400).json({error: "La calificación debe ser entre 0 y 5"});
        }
        const review = await Review.create({
            rating,
            comment,
            visit_date,
            user_id: userId,
            destination_id: destinationId
        })
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const updateReview = async (req,res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;  
    try {
        if(isNaN(id)) return res.status(400).json({error: "El ID debe ser un número."});
        const review = await Review.findByPk(id);
        if(!review) return res.status(404).json({error:"Reseña no encontrada."});
        if(rating && (rating < 0 || rating > 5)) return res.status(400).json({error: "La calificación debe estar entre 0 y 5"});
        const updatedReview = await review.update({ rating,comment });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}