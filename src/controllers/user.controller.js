import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json('Error al traer todos los usuarios')
    }
}

export const getUser = async (req, res)