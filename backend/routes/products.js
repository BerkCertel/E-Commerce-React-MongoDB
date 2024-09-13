const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");
const Category = require("../models/Category");

// Ürün oluşturma (create)
router.post("/", async (req, res) => {
  try {
    const productName = req.body.name;

    const existingProduct = await Category.findOne({ name: productName });

    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists." });
    }

    const newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

// Tüm Ürünleri getirme (read all)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

//Tek bir ürün getirme(read single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

// Ürün güncelleme (update)
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

// ürünsilme (delete)
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

// İsme göre ürün arama
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;

    const products = await Product.find({
      name: { $regex: productName, $options: "i" },
    });

    if (!products) {
      return res.status(404).json({ error: "Filtered product not found." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

module.exports = router;
