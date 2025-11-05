// Check For Errors...
const express = require("express");
const Product = require("../Models/products_models");

const router = express.Router();

// Get all products

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

//Get product by id

// router.get("/:id", async (req,res)=>{
//   const product = await Product.findById(req.params.id);
//   res.json(product)
// })


// Add new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Update product

router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Delete product

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
