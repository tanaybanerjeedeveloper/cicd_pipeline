const request = require("supertest");
const { app } = require("../index");
const { getEmployees, getEmployeeId } = require("../controllers");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpont testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and the list of all employees", async () => {
    let mockData = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    let result = await request(server).get("/employees");

    expect(result.status).toEqual(200);
    expect(result.body.employees).toEqual(mockData);
  });

  it("should return 200 and the employee matching the id", async () => {
    let mockData = {
      employeeId: 2,
      name: "Priya Singh",
      email: "priya.singh@example.com",
      departmentId: 2,
      roleId: 2,
    };

    let result = await request(server).get("/employees/details/2");

    expect(result.status).toEqual(200);
    expect(result.body.employee).toEqual(mockData);
  });
});

describe("Function testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of all employees", async () => {
    let mockData = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    let employees = getEmployees();
    expect(employees).toEqual(mockData);
    expect(employees.length).toBe(3);
  });

  it("should return the employee by id", () => {
    let mockData = {
      employeeId: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      departmentId: 1,
      roleId: 1,
    };
    let result = getEmployeeId(1);

    expect(result).toEqual(mockData);
  });

  it("should return undefined if no employee is found", () => {
    let result = getEmployeeId(99);
    expect(result).toBeUndefined();
  });
});
