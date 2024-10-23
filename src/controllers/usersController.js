import User from "../db"

const getAllUsers = async (req,res) => {
    // const { name } = req.query;
    const users = await User.findAll();
    return users  
}

export default {
    getAllUsers,
}