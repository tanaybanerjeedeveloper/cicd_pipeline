const request = require("supertest");
const { app, validateArticle, validateAuthor } = require("../index");

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

  it("should return 200 and the new article added", async () => {
    let mockData = { title: "abc", content: "abc" };
    let result = await request(server).post("/articles").send(mockData);
    expect(result.status).toEqual(200);
    expect(result.body.article).toEqual({ id: 3, ...mockData });
  });

  it("should return 200 and the new author added", async () => {
    let mockData = { name: "abc", articleId: 2 };
    let result = await request(server).post("/authors").send(mockData);

    expect(result.status).toEqual(200);
    expect(result.body.author).toEqual({ id: 3, ...mockData });
  });
});

describe("API Endpoints FAIL cases testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //add article api
  it("should return 400 and an error text if no title is provided", async () => {
    let mockData = { content: "abc" };
    let result = await request(server).post("/articles").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Title is required and should be a string");
  });

  it("should return 400 and an error text if no content is provided", async () => {
    let mockData = { title: "abc" };
    let result = await request(server).post("/articles").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Content is required and should be a string");
  });

  //add author api
  it("should return 400 and an error text if no name is provided", async () => {
    let mockData = { articleId: 1 };
    let result = await request(server).post("/authors").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Name is required and should be a string");
  });

  it("should return 400 and an error text if no articleId is provided", async () => {
    let mockData = { name: "abc" };
    let result = await request(server).post("/authors").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual("articleId is required and should be a number");
  });
});

describe("Validation functions testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //validateArticle
  it("should return an error text if no title is provided", () => {
    let mockData = { content: "abc" };
    expect(validateArticle(mockData)).toEqual(
      "Title is required and should be a string",
    );
  });

  it("should return an error text if no content is provided", () => {
    let mockData = { title: "abc" };
    expect(validateArticle(mockData)).toEqual(
      "Content is required and should be a string",
    );
  });

  it("should return null if all info is provided", () => {
    let mockData = { title: "abc", content: "abc" };
    expect(validateArticle(mockData)).toBeNull();
  });

  //validateAuthor
  it("should return an error text if no name is provided", () => {
    let mockData = { articleId: 1 };
    expect(validateAuthor(mockData)).toEqual(
      "Name is required and should be a string",
    );
  });

  it("should return an error text if no articleId is provided", () => {
    let mockData = { name: "abc" };
    expect(validateAuthor(mockData)).toEqual(
      "articleId is required and should be a number",
    );
  });

  it("should return null if all info is provided", () => {
    let mockData = { name: "abc", articleId: 1 };
    expect(validateAuthor(mockData)).toBeNull();
  });
});
