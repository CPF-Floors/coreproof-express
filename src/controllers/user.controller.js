import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ message: 'Error al traer todos los usuarios' }, error)
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: 'Error al traer este usuario' }, error)
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' }, error)
    }
}

export const getUserByQuery = async (req, res) => {
    const { query } = req.query;

    if (!query || query.trim() === "") {
        return res.status(400).json({ message: "La consulta no puede estar vacía" });
    }

    try {
        const users = await User.find({
            $or: [
                { fullName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { businessName: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json({ users });
    } catch (error) {
        console.error("Error al buscar usuarios:", error);
        res.status(500).json({ message: "Error del servidor", error });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            res.status(404).json({ message: 'Error al eliminar este usuario' }, error)
        }
        res.status(204).json({ message: `Usuario ${user.fullName} eliminado con exito` })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" }, error)
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params
    const { fullName, address, businessName, phoneNumber, email, password } = req.body
    try {
        let newPassword;
        if (password) {
            newPassword = await bcrypt.hash(password, 10);
        }
        const updatedData = {
            ...fullName && { fullName: fullName },
            ...address && { address: address },
            ...businessName && { businessName: businessName },
            ...phoneNumber && { phoneNumber: phoneNumber },
            ...email && { email: email },
            ...password && { password: newPassword }
        }
        const user = await User.findByIdAndUpdate(id, updatedData, { new: true })
        if (!user) {
            res.status(404).json({ message: 'Error al modificar este usuario' }, error)
        }
        res.status(200).json({ message: `Usuario ${user.fullName} modificado con exito` })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" }, error)
    }
}