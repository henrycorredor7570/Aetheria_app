const getAllUsers = async (req,res) => {

    const users = await User.findAll();

   
    return users
    
}

export default {
    getAllUsers,
}