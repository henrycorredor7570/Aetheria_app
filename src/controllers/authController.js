import { User} from "../db";
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "aetheria_secret_key"; // esta es mi clave secreta para firmar los tokens

//Registro del usuario:
export const registerUser = async (req,res) => {
    const { username, email, password} = req.body;

    try {
        //verificamos si el usuario ya existe
        const existingUser = await User
    } catch (error) {
        
    }
}