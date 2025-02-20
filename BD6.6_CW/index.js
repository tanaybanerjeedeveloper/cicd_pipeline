const cors = require("cors");
const express = require("express");
const app = express();
const { getEmployees, getEmployeeId } = require("./controllers");

app.use(cors());
app.use(express.json());

//API endpoints
app.get("/employees", async (req, res) => {
  let employees = getEmployees();
  return res.status(200).json({ employees });
});

app.get("/employees/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let employee = getEmployeeId(id);
  return res.status(200).json({ employee });
});

module.exports = { app };
