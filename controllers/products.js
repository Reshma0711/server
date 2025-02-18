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
      totalPages: Math.ceil(totalProducts / limit)
    });
  } catch (err) {
    return res.status(500).send({
      err: err,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

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
      name,
      price,
      description,
      category,
      stock: stock || 0,
      image,

    });

    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
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
    // Use updateMany() to update all products
    const result = await Product.updateMany(
      {}, // The empty object {} means "apply to all products"
      { $set: { image: "", rating: null } } // Set default values for new fields: image and rating
    );

    // Log the result to the console (show how many products were updated)
    console.log(result);
    console.log(`Updated ${result.modifiedCount} products.`);
    return res.status(200).json({
      message: `${result.modifiedCount} products updated successfully.`,
    });
  } catch (error) {
    // If an error occurs, log it to the console
    return res.status(400).json({
      message: `Error in updating products: `,
      error,
    });
  }
};

module.exports = { productPagination, addProduct, getProducts, updateProducts };
