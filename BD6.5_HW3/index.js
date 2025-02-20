const express = require("express");
const app = express();

app.use(express.json());

let articles = [
  {
    id: 1,
    title: "Understanding JavaScript",
    content:
      "JavaScript is a versatile language used for both frontend and backend development.",
  },
  {
    id: 2,
    title: "Introduction to React",
    content:
      "React is a popular JavaScript library for building user interfaces.",
  },
];

let authors = [
  {
    id: 1,
    name: "John Doe",
    articleId: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    articleId: 2,
  },
];

const validateArticle = (article) => {
  if (!article.title || typeof article.title !== "string") {
    return "Title is required and should be a string";
  }
  if (!article.content || typeof article.content !== "string") {
    return "Content is required and should be a string";
  }
  return null;
};

const validateAuthor = (author) => {
  if (!author.name || typeof author.name !== "string") {
    return "Name is required and should be a string";
  }
  if (!author.articleId || typeof author.articleId !== "number") {
    return "articleId is required and should be a number";
  }
  return null;
};

//api endpoints
app.post("/articles", async (req, res) => {
  let article = req.body;
  let error = validateArticle(article);
  if (error) return res.status(400).send(error);

  let newArticle = { id: articles.length + 1, ...article };
  articles.push(newArticle);
  return res.status(200).json({ article: newArticle });
});

app.post("/authors", async (req, res) => {
  let author = req.body;
  let error = validateAuthor(author);
  if (error) return res.status(400).send(error);

  let newAuthor = { id: authors.length + 1, ...author };
  authors.push(newAuthor);
  return res.status(200).json({ author: newAuthor });
});

module.exports = { app, validateArticle, validateAuthor };
