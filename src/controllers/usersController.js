import { User } from "../db.js";

export const getAllUsers = async (req,res) => {
    const { name } = req.query;
    try { 
        const users = await User.findAll();
        if(name){
            const userFiltered = users.filter((user) => user.username && user.username.includes(name));
            if(userFiltered.length < 1) throw Error(`No existe el usuario con nombre: ${name}`);
            res.status(200).json(userFiltered);
        }else{
            if(users.length < 1) throw Error(`¡No hay usuarios en la base de datos!`)
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getUserById = async (req,res) => {
    const response = "obtener usuario por id" 
    res.status(200).json(response)
}

export const createUser = async (req, res) => {
    const response = "crear usuario" 
    res.status(200).json(response)
}

export const updateUser = async (req,res) => {
    const response = "actualizar usuario" 
    res.status(200).json(response)
}

export const deleteUser = async (req,res) => {
    const response = "eliminar usuario" 
    res.status(200).json(response)
}