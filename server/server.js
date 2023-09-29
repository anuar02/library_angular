const cors = require("cors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const books = require("./routes/library");
const express = require("express");
const { mockBooks } = require("./models/book");
const app = express();

mongoose
  .connect("mongodb://localhost/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Подключение к базе данных успешно установлено");

    // Инициализация базы данных с mockBooks
    // initializeDatabase();

    // Запуск сервера
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  })
  .catch((error) => {
    console.error("Ошибка при подключении к базе данных:", error);
  });

// Инициализация базы данных с mockBooks
// const initializeDatabase = async () => {
//   try {
//     const Book = require("./models/book.js").Book;

//     // Очищаем существующие записи (если нужно)
//     await Book.deleteMany({});

//     // Добавляем mockBooks в базу данных
//     await Book.insertMany(mockBooks);

//     console.log("Инициализация базы данных завершена.");
//   } catch (error) {
//     console.error("Ошибка при инициализации базы данных:", error);
//   }
// };

app.use(express.json());
app.use(cors());
app.use("/api/library", books);
