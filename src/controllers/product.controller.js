import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" }, error);
    }
}

export const getVinylProducts = async (req, res) => {
    try {
        const products = await Product.find({ material: "Vinyl" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" }, error);
    }
}
export const getLaminateProducts = async (req, res) => {
    try {
        const products = await Product.find({ material: "Laminate" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" }, error);
    }
}

export const createNewProduct = async (req, res) => {
    const { name, productType, material, description, price } = req.body
    try {
        const product = new Product({
            name: name,
            productType: productType,
            material: material,
            description: description,
            price: price
        })

        await product.save()
        res.status(201).json({ message: "Producto created" })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" }, error);
    }
}

export const editProduct = async (req, res) => {
    const { id } = req.params
    const { name, productType, material, description, price } = req.body
    try {
        const updateProduct = {
            ...name && {name: name},
            ...productType && {productType: productType},
            ...material && {material: material},
            ...description && {description: description},
            ...price && {price: price}
        }

        const product = await Product.findByIdAndUpdate(id, updateProduct, {new: true})

        res.status(200).json({message: "Product updated succesfully"}, product)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" }, error);
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        res.status(204).json({message: "Product has been deleted succesfully"}, product)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" }, error);
    }
}

//Distintos filtrados
export const getVinylFloors = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Floor", material: "Vinyl" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getLaminateFloors = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Floor", material: "Laminate" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getVinylSteps = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Step", material: "Vinyl" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getLaminateSteps = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Step", material: "Laminate" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getVinylMoldings = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Molding", material: "Vinyl" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getLaminateMoldings = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Molding", material: "Laminate" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getVinylBaseboards = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Baseboard", material: "Vinyl" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getLaminateBaseboards = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Baseboard", material: "Laminate" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getVinylUnderlayments = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Underlayment", material: "Vinyl" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

export const getLaminateUnderlayments = async (req, res) => {
    try {
        const products = await Product.find({ productType: "Underlayment", material: "Laminate" })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

