import { User } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../services/emailService.js";
import { isStrongPassword } from "../services/isStrongPassword.js";

const SECRET_KEY = process.env.JWT_SECRET; //clave secreta para firmar los tokens
const URL_FRONTEND = process.env.FRONTEND_URL;

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
    const { 
        name, 
        email, 
        password, 
        confirm_password, 
        first_name, 
        last_name, 
        birth_date, 
        gender, 
        profile_picture,
        role, 
        terms
    } = req.body;

    try {
        //creamos una validación básica:
        if(!name || !email || !password || !confirm_password || !first_name || !last_name){
            return res.status(400).json({ message: 'Faltan campos obligatorios.'});
        };
        //confirmamos si las contraseñas son iguales.
        if(password !== confirm_password){
            return res.status(400).json({message: 'Las contraseñas no coinciden.'});
        };
        //verificar si la contraseña cumple con las condiciones dadas
        if(!isPasswordValid(password)){
            return res.status(400).json({message: 'La contraseña es demasiado débil.'});
        }
        //validar si se aceptan los terminos y condiciones de la página.
        if(!terms){
            return res.status(400).json({message: 'Debes aceptar los términos y condiciones.'});
        }
        //verificamos si el nombre de usuario ya existe:
        const existingUser = await User.findOne({where:{name}});
        if(existingUser){
            return res.status(400).json({message:"El nombre de usuario ya está en uso, elige otro nombre de usuario por favor."});
        }
        //verificamos si el usuario ya se encuentra registrado con el email:
        const existingEmail = await User.findOne({where:{email}});
        if(existingEmail){
            return res.status(400).json({message: 'El email ya está registrado en la base de datos.'});
        }
        //hasheamos la contraseña:
        const hashedPassword = await bcrypt.hash(password, 10);

        //Generamos el token de verificacion:
        const verificationToken = crypto.randomBytes(32).toString("hex");

        //creamos el usuario en la db:
        const newUser = await User.create({
            username:name,
            email,
            password_hash: hashedPassword, //guardamos al contraseña ya hasheada
            first_name,
            last_name,
            birth_date,
            gender,
            profile_picture,
            role,
            is_verified: false,
            verification_token: verificationToken
        })

        //llamamos en servicio para enviar el email:
        const verificationUrl = `http://localhost:3000/users/verify/${verificationToken}`;
        
        await sendVerificationEmail(email, name, verificationUrl);
        
        res.status(201).json({message:"Usuario registrado exitosamente.", user:newUser});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message});
    }
}

export const verifyEmail = async (req,res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ where: {verification_token: token }});
        if (!user) return res.status(400).json({error: "Token inválido o expirado"});

        user.is_verified = true;
        user.verification_token = null;
        await user.save();

        //redirige a mi pagina de verificacion en el frontend
        return res.redirect(`${URL_FRONTEND}/verified`);
    } catch (error) {
        res.status(500).json({error: error.message});
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

export const loginUser = async (req,res) => {
    const { email, password } = req.body; 

    try {
        //verificamos inicialmente si el usuario existe en la base de datos:
        const user = await User.findOne({ where: {email} });
        if(!user) {
            return res.status(404).json({message:"Usuario no encontrado."});
        }

        //comparamos la contraseña proporcionada con el hash almacenado:
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if(!isPasswordValid) {
            return res.status(401).json({error:"Credenciales incorrectas."});
        }

        //Generamos un token JWT:
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "1h"} // configuramos la expiracion del token 
        )

        //respondemos con el token y los datos del usuario:
        res.status(200).json({message:"Inicio de sesión exitoso.", token, user });
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
};