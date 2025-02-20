const request = require("supertest");

const {
  app,
  validateBook,
  validateReview,
  validateUserObj,
} = require("../index");

const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API endpoints testing for PASS cases", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should give 200 status and new-user created", async () => {
    let mockData = { name: "tanay banerjee", email: "tanayb@gmail.com" };
    let result = await request(server).post("/api/users").send(mockData);
    expect(result.status).toEqual(200);
    expect(result.body.newUser).toEqual({
      id: 1,
      ...mockData,
    });
  });

  it("should give 200 status and new-book created", async () => {
    let mockData = { title: "New title", author: "authjor" };
    let result = await request(server).post("/api/books").send(mockData);
    expect(result.status).toEqual(200);
    expect(result.body.newBook).toEqual({
      id: 1,
      ...mockData,
    });
  });

  it("should give 200 status and new-review when new-review is created", async () => {
    let mockData = { content: "new contetn", userId: 1 };
    let result = await request(server).post("/api/reviews").send(mockData);
    expect(result.status).toEqual(200);
    expect(result.body.newReview).toEqual({
      id: 1,
      ...mockData,
    });
  });
});

describe("API endpoints testing for FAIL cases", () => {
  it("should give 400 for failing to create new user with no email", async () => {
    let mockData = { name: "new name" };
    let result = await request(server).post("/api/users").send(mockData);
    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Email is required and should be string");
  });

  it("should give 400 for failing to create new user with no name", async () => {
    let mockData = { email: "aBC@gmail.com" };
    let result = await request(server).post("/api/users").send(mockData);
    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Name is required and should be a string");
  });

  it("should give 400 for failing to create new book with no title", async () => {
    let mockData = { author: "author" };
    let result = await request(server).post("/api/books").send(mockData);
    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Title is required and should be a string");
  });

  it("should give 400 for failing to create new book with no author", async () => {
    let mockData = { title: "author" };
    let result = await request(server).post("/api/books").send(mockData);
    expect(result.status).toEqual(400);
    expect(result.text).toEqual("Author is required and should be a string");
  });

  it("should give 400 for failing to create review with no content", async () => {
    let mockData = { userId: 1 };
    let result = await request(server).post("/api/reviews").send(mockData);
    expect(result.status).toEqual(400);
    expect(result.text).toEqual(
      "Review content is required and it should be a string",
    );
  });
  it("should give 400 for failing to create review with no userId", async () => {
    let mockData = { content: "content" };
    let result = await request(server).post("/api/reviews").send(mockData);
    expect(result.status).toEqual(400);
    expect(result.text).toEqual(
      "Review userid is required and it should be a number",
    );
  });

  describe("validation functions testing", () => {
    it("should return a text if user does not have a name", () => {
      let mockData = { email: "abc@gmail.com" };
      expect(validateUserObj(mockData)).toEqual(
        "Name is required and should be a string",
      );
    });

    it("should return a text if user does not have an email", () => {
      let mockData = { name: "abc" };
      expect(validateUserObj(mockData)).toEqual(
        "Email is required and should be string",
      );
    });

    it("should return null if user has all the info", () => {
      let mockData = { name: "abc", email: "abc@gmail.com" };
      expect(validateUserObj(mockData)).toBeNull();
    });

    it("should return a text if book does not have a title", () => {
      let mockData = { author: "abc" };
      expect(validateBook(mockData)).toEqual(
        "Title is required and should be a string",
      );
    });

    it("should return a text if book does not have an author", () => {
      let mockData = { title: "abc" };
      expect(validateBook(mockData)).toEqual(
        "Author is required and should be a string",
      );
    });

    it("should return null if book has all the required info", () => {
      let mockData = { title: "abc", author: "xyz" };
      expect(validateBook(mockData)).toBeNull();
    });
  });

  it("should return a text if review does not have a content", () => {
    let mockData = { userId: 2 };
    expect(validateReview(mockData)).toEqual(
      "Review content is required and it should be a string",
    );
  });

  it("should return a text if review does not have an userId", () => {
    let mockData = { content: "abc" };
    expect(validateReview(mockData)).toEqual(
      "Review userid is required and it should be a number",
    );
  });

  it("should return null if review has all the the required info", () => {
    let mockData = { content: "abc", userId: 1 };
    expect(validateReview(mockData)).toBeNull();
  });
});
