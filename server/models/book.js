const Joi = require("joi");
const mongoose = require("mongoose");

// Определение схемы для книг
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  author: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
  },
  pages: {
    type: Number,
    required: true,
    min: 1,
  },
  language: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  genre: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
});

// Создание модели для книг
const Book = mongoose.model("Book", bookSchema);

// Определение схемы валидации с использованием Joi
const bookValidationSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(255)
    .required(),
  author: Joi.string()
    .min(1)
    .max(255)
    .required(),
  description: Joi.string()
    .min(1)
    .max(1024)
    .required(),
  pages: Joi.number()
    .min(1)
    .required(),
  language: Joi.string()
    .min(1)
    .max(50)
    .required(),
  genre: Joi.string()
    .min(1)
    .max(50)
    .required(),
});

const mockBooks = [
  {
    title: "Книга 1",
    author: "Автор 1",
    description: "Описание книги 1",
    pages: 300,
    language: "Русский",
    genre: "Фантастика",
  },
  {
    title: "Книга 2",
    author: "Автор 2",
    description: "Описание книги 2",
    pages: 250,
    language: "Английский",
    genre: "Детектив",
  },
  {
    title: "Книга 3",
    author: "Автор 3",
    description: "Описание книги 3",
    pages: 400,
    language: "Французский",
    genre: "Роман",
  },
];

// Экспорт модели и схемы валидации
exports.Book = Book;
exports.mockBooks = mockBooks;
exports.bookValidationSchema = bookValidationSchema;
