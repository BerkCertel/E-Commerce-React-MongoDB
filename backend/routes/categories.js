const express = require("express");
const router = express.Router();
const Category = require("../models/Category.js");

// category oluşturma (create)
router.post("/", async (req, res) => {
  try {
    const categoryName = req.body.name;

    const existingCategory = await Category.findOne({ name: categoryName });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists." });
    }

    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

//Tüm categorileri getir(read-all)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

// Tek kategori getirme(single-read)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    try {
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Category not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

// Category güncelleme (update)
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

// kategori silme (delete)
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
});

module.exports = router;
