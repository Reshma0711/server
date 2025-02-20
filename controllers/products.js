const Product = require("../models/products");

const productPagination = async (req, res) => {
  try {
    const productPerPage = req.query.productPerPage
      ? parseInt(req.query.productPerPage)
      : 5;
    //PageNumber From which Page to Start
    const pageNumber = req.query.page ? parseInt(req.query.page) : 1;

    const skip = (pageNumber - 1) * pagination;
    const products = await Product.find()
      //skip takes argument to skip number of entries
      .sort({ _id: 1 })
      .skip(skip)
      //limit is number of Records we want to display
      .limit(pagination);

    const totalProducts = await Product.countDocuments();

    return res.status(200).json({
      product: products,
      totalProducts,
      currentPage: req.pagination.page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (err) {
    return res.status(500).send({
      err: err,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { id, name, price, description, category, stock, image } = req.body;

    if (!name || !price || !description || !category) {
      return res
        .status(400)
        .json({ message: "All fields are required except stock." });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists." });
    }

    const newProduct = new Product({
      id,
      name,
      price,
      description,
      category,
      stock: stock || 0,
      image,
    });

    await newProduct.save();
    console.log(newProduct);
    return res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(201).json(products);
    // console.log(products)
  } catch (err) {
    // console.error(err);
    return res.status(500).send("Server Error");
  }
};

// This function will update all products in the database
const updateProducts = async (req, res) => {
  try {
    // Use updateMany to remove the 'id' field from all products
    const result = await Product.updateMany({}, { $unset: { quantity:0 } });

    console.log(`Updated ${result.modifiedCount} products.`);
    return res.status(200).json({
      message: `${result.modifiedCount} products updated successfully.`,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error in updating products",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: "Product delete Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a product by ID
const getProductById = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const product = await Product.findOne({ id: parseInt(id) });
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

let cart = [];


module.exports = {
  productPagination,
  addProduct,
  getProducts,
  updateProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
