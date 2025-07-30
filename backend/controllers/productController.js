import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModule.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, popular } = req.body;
    let imageUrl = "https://via.placeholder.com/150"; // default image URL

    // Upload image only if file is provided
    if (req.file) {
      console.log("Uploaded file:", req.file);
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      popular: popular === "true",
      image: imageUrl,
      date: Date.now(),
    };

    console.log("Product Data:", productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Created" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//controller function to delete a product
const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "product Deleted" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//controller function to list all product
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//controller function to fetch a single  product details
const getProductById = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { createProduct, deleteProduct, getAllProducts, getProductById };
