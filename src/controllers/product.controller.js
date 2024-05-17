import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error});
  }
};

export const getVinylProducts = async (req, res) => {
  try {
    const products = await Product.find({ material: "Vinyl" });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error});
  }
};
export const getLaminateProducts = async (req, res) => {
  try {
    const products = await Product.find({ material: "Laminate" });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error});
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById({_id: id});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error});
  }
};

export const createNewProduct = async (req, res) => {
  const { name, productType, material, description, price } = req.body;
  try {
    const product = new Product({
      name: name,
      productType: productType,
      material: material,
      description: description,
      price: price,
    });

    await product.save();
    res.status(201).json({ message: "Producto created" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error});
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, productType, material, description, price } = req.body;
  try {
    const updateProduct = {
      ...(name && { name: name }),
      ...(productType && { productType: productType }),
      ...(material && { material: material }),
      ...(description && { description: description }),
      ...(price && { price: price }),
    };

    const product = await Product.findByIdAndUpdate(id, updateProduct, {
      new: true,
    });

    res.status(200).json({ message: "Product updated succesfully", product});
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error});
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete({_id: id});
    res
      .status(204)
      .json({ message: "Product has been deleted succesfully", product});
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error});
  }
};

//Distintos filtrados
export const getProductByQuery = async (req, res) => {
  const { product, material } = req.query;
  try {
    const products = await Product.find({
      productType: product,
      material: material,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error});
  }
};
