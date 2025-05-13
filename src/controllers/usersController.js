import { User } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const { id } = req.params;
    try {
        const userId = await User.findByPk(id);    
        if(!userId) res.status(400).json({error: "Usuario no encontrado"});
        res.status(200).json(userId);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //verificamos si el usuario existe:
        const existingUser = await User.findone({where:{email}});
        if(existingUser){
            return res.status(400).json({error:"el usuario ya se encuentra registrado."});
        }

        //hasheamos la contraseña:
        const hashedPassword = await bcrypt.hash(password, 10);

        //creamos el usuario en la db:
        const newUser = await User.create({
            username:name,
            email,
            password_hash: hashedPassword, //guardamos al contraseña ya hasheada
        })
        res.status(201).json({message:"Usuario registrado exitosamente.", user:newUser});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const updateUser = async (req,res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await User.findByPk(id)
        if(!user) return res.status(404).json({error: "Usuario no encontrado"})
        
        user.username = name || user.username;
        user.email = email || user.email;
        user.password_hash = password || user.password_hash;

        await user.save();
        res.status(200).json({message:`Usuario con el id: ${id} actualizado correctamente.`});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id)
        if(!user) return res.status(404).json({error:`Usuario no encontrado en la base de datos`})
        await user.destroy();
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}