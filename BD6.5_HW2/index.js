const expres = require("express");
const app = expres();

app.use(expres.json());

const employees = [];
const companies = [];

//validation functions
const validateEmployee = (employee) => {
  if (!employee.name || typeof employee.name !== "string") {
    return "Name is required and should be a string";
  }
  if (!employee.companyId || typeof employee.companyId !== "number") {
    return "CompanyId is required and should be a number";
  }
  return null;
};

const validateCompany = (company) => {
  if (!company.name || typeof company.name !== "string") {
    return "Name is required and it should be a string";
  }
  return null;
};

//api endpoints
app.post("/api/employees", async (req, res) => {
  let employee = req.body;

  let error = validateEmployee(employee);
  if (error) return res.status(400).send(error);

  let newEmployee = { id: employees.length + 1, ...employee };
  employees.push(newEmployee);
  return res
    .status(200)
    .json({ message: "Employee added successfully!", employee: newEmployee });
});

app.post("/api/companies", async (req, res) => {
  let company = req.body;

  let error = validateCompany(company);
  if (error) return res.status(400).send(error);

  let newCompany = { id: companies.length + 1, ...company };
  companies.push(newCompany);
  return res
    .status(200)
    .json({ message: "Company is added successfully!", company: newCompany });
});

module.exports = { app, validateCompany, validateEmployee };
