const express = require("express");

const app = express();

app.use(express.json());

const users = [];
const books = [];
const reviews = [];

const validateUserObj = (user) => {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required and should be a string";
  } else if (!user.email || typeof user.email !== "string") {
    return "Email is required and should be string";
  }
  return null;
};

const validateBook = (book) => {
  if (!book.title || typeof book.title !== "string") {
    return "Title is required and should be a string";
  } else if (!book.author || typeof book.author !== "string") {
    return "Author is required and should be a string";
  }
  return null;
};

const validateReview = (review) => {
  if (!review.content || typeof review.content !== "string") {
    return "Review content is required and it should be a string";
  } else if (!review.userId || typeof review.userId !== "number") {
    return "Review userid is required and it should be a number";
  }
  return null;
};

app.post("/api/users", async (req, res) => {
  let newUser = req.body;
  let error = validateUserObj(newUser);
  if (error) return res.status(400).send(error);

  let user = { id: users.length + 1, ...newUser };
  users.push(user);

  return res
    .status(200)
    .json({ message: "User has been created successfully!", newUser: user });
});

app.post("/api/books", async (req, res) => {
  let book = req.body;
  let error = validateBook(book);

  if (error) return res.status(400).send(error);

  let newBook = { id: books.length + 1, ...book };
  books.push(newBook);

  return res
    .status(200)
    .json({ message: "New book created successfully!", newBook });
});

app.post("/api/reviews", async (req, res) => {
  let review = req.body;
  let error = validateReview(review);
  if (error) return res.status(400).send(error);
  let newReview = { id: reviews.length + 1, ...review };
  reviews.push(newReview);
  return res.status(200).json({ message: "New review is created", newReview });
});

module.exports = { app, validateBook, validateReview, validateUserObj };
