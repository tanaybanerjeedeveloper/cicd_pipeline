const express = require("express");
const app = express();

app.use(express.json());

const games = [];
const tournaments = [];

//validation functions
const validateGame = (game) => {
  if (!game.title || typeof game.title !== "string") {
    return "Game should have title and it should be a string";
  }
  if (!game.genre || typeof game.genre !== "string") {
    return "Game should have genre and it should be a string";
  }

  return null;
};

const validateTournament = (tournament) => {
  if (!tournament.name || typeof tournament.name !== "string") {
    return "Tournament should have name and it should be a string";
  }
  if (!tournament.gameId || typeof tournament.gameId !== "number") {
    return "Tournament should have a gameId and it should be a number";
  }
  return null;
};

//api endpoints
app.post("/api/games", async (req, res) => {
  let game = req.body;
  let error = validateGame(game);
  if (error) return res.status(400).send(error);
  let newGame = { id: games.length + 1, ...game };
  games.push(newGame);
  return res
    .status(200)
    .json({ message: "Game has been added successfully!", game: newGame });
});

app.post("/api/tournaments", async (req, res) => {
  let tournament = req.body;
  let error = validateTournament(tournament);
  if (error) return res.status(400).send(error);
  let newTournament = { id: tournaments.length + 1, ...tournament };
  tournaments.push(newTournament);
  return res
    .status(200)
    .json({ message: "Tournamnet has been added", tournament: newTournament });
});

module.exports = { app, validateGame, validateTournament };
