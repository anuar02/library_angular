const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Book, bookValidationSchema } = require("../models/book");

router.post("/create", async (req, res) => {
  const { error } = bookValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  bookData = req.body;
  // Create a new book
  const book = new Book({
    author: bookData.author,
    title: bookData.title,
    description: bookData.description,
    pages: bookData.pages,
    language: bookData.language,
    genre: bookData.genre,
  });

  book
    .save()
    .then((savedBook) => {
      // Handle successful creation
      res.status(201).json(savedBook);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/authors", async (req, res) => {
  try {
    const authors = await Book.aggregate([
      {
        $group: {
          _id: "$author",
        },
      },
    ]);
    const uniqueAuthors = authors.map((author) => author._id);
    res.json(uniqueAuthors);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/genres", async (req, res) => {
  try {
    const genres = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
        },
      },
    ]);
    const uniqueGenres = genres.map((genre) => genre._id);

    res.json(uniqueGenres);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/languages", async (req, res) => {
  try {
    const languages = await Book.aggregate([
      {
        $group: {
          _id: "$language",
        },
      },
    ]);

    // Filter out null or undefined values and extract _id
    const uniqueLanguages = languages
      .filter((language) => language._id !== null && language._id !== undefined)
      .map((language) => language._id);

    res.json(uniqueLanguages);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Книга не найдена");
    res.json(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  // Валидация данных с использованием Joi
  const { error } = bookValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        pages: req.body.pages,
        language: req.body.language,
        genre: req.body.genre,
      },
      { new: true }
    );

    if (!updatedBook) return res.status(404).send("Книга не найдена");
    res.json(updatedBook);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    if (!deletedBook) return res.status(404).send("Книга не найдена");
    res.json(deletedBook);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
