const request = require("supertest");
const { app, validateCompany, validateEmployee } = require("../index");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints PASS cases testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //add employee api
  it("should return 200 and the new-employee added", async () => {
    let mockData = { name: "abc", companyId: 1 };
    let result = await request(server).post("/api/employees").send(mockData);

    expect(result.status).toEqual(200);
    expect(result.body.message).toEqual("Employee added successfully!");
    expect(result.body.employee).toEqual({ id: 1, ...mockData });
  });

  //add company api
  it("should return 200 and the new-company added", async () => {
    let mockData = { name: "anbc" };
    let result = await request(server).post("/api/companies").send(mockData);
    expect(result.status).toEqual(200);
    expect(result.body.message).toEqual("Company is added successfully!");
    expect(result.body.company).toEqual({ id: 1, ...mockData });
  });
});

describe("API Endpoints FAIL cases testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //add employee api
  it("should return 400 and a text if no name is provided", async () => {
    let mockData = { companyId: 1 };
    let result = await request(server).post("/api/employees").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Name is required and should be a string");
  });

  it("should return 400 and a text if no companyId is provided", async () => {
    let mockData = { name: "abc" };
    let result = await request(server).post("/api/employees").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("CompanyId is required and should be a number");
  });

  //add company api
  it("should return 400 and a text if name is not provided", async () => {
    let mockData = {};
    let result = await request(server).post("/api/companies").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Name is required and it should be a string");
  });
});

describe("Validation functions testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //validateEmployee
  it("should return a text if no name is provided", () => {
    let mockData = { companyId: 2 };
    expect(validateEmployee(mockData)).toEqual(
      "Name is required and should be a string",
    );
  });

  it("should return a text if no companyId is provided", () => {
    let mockData = { name: "abc" };
    expect(validateEmployee(mockData)).toEqual(
      "CompanyId is required and should be a number",
    );
  });

  it("should return null if all info is provided", () => {
    let mockData = { name: "abc", companyId: 2 };
    expect(validateEmployee(mockData)).toBeNull();
  });

  //validateCompany
  it("should return a text if no name is provided", () => {
    let mockData = {};
    expect(validateCompany(mockData)).toEqual(
      "Name is required and it should be a string",
    );
  });

  it("should return null if name is provided", () => {
    let mockData = { name: "abc" };
    expect(validateCompany(mockData)).toBeNull();
  });
});
