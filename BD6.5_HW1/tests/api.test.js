const request = require("supertest");
const { app, validateGame, validateTournament } = require("../index");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("api endpoint PASS cases testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add and return new-game", async () => {
    let mockData = { title: "abc", genre: "abc" };
    let result = await request(server).post("/api/games").send(mockData);

    expect(result.status).toEqual(200);
    expect(result.body.message).toEqual("Game has been added successfully!");
    expect(result.body.game).toEqual({ id: 1, ...mockData });
  });

  it("should add and return new-tournament", async () => {
    let mockData = { name: "abc", gameId: 1 };
    let result = await request(server).post("/api/tournaments").send(mockData);

    expect(result.status).toEqual(200);
    expect(result.body.message).toEqual("Tournamnet has been added");
    expect(result.body.tournament).toEqual({ id: 1, ...mockData });
  });
});

describe("api endpoint FAIL cases testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 and a text if game title is not provided", async () => {
    let mockData = { genre: "abc" };
    let result = await request(server).post("/api/games").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual(
      "Game should have title and it should be a string",
    );
  });

  it("should return 400 and a text if game genre is not provided", async () => {
    let mockData = { title: "abnc" };
    let result = await request(server).post("/api/games").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual(
      "Game should have genre and it should be a string",
    );
  });

  it("should return 400 and a text if tournament name is not provided", async () => {
    let mockData = { gameId: 2 };
    let result = await request(server).post("/api/tournaments").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual(
      "Tournament should have name and it should be a string",
    );
  });

  it("should return 400 and a text if tournament gameId is not provided", async () => {
    let mockData = { name: "abc" };
    let result = await request(server).post("/api/tournaments").send(mockData);

    expect(result.status).toEqual(400);
    expect(result.text).toEqual(
      "Tournament should have a gameId and it should be a number",
    );
  });
});

describe("validation functions testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //validateGame
  it("should return a text if no title is provided", () => {
    let mockData = { genre: "abc" };
    expect(validateGame(mockData)).toEqual(
      "Game should have title and it should be a string",
    );
  });

  it("should return a text if no genre is provided", () => {
    let mockData = { title: "abc" };
    expect(validateGame(mockData)).toEqual(
      "Game should have genre and it should be a string",
    );
  });

  it("should return null if all info provided", () => {
    let mockData = { title: "abc", genre: "xyzx" };
    expect(validateGame(mockData)).toBeNull();
  });

  //validateTournament
  it("should return a text if no name is provided", () => {
    let mockData = { gameId: 1 };
    expect(validateTournament(mockData)).toEqual(
      "Tournament should have name and it should be a string",
    );
  });

  it("should return a text if no gameId is provided", () => {
    let mockData = { name: "abc" };
    expect(validateTournament(mockData)).toEqual(
      "Tournament should have a gameId and it should be a number",
    );
  });

  it("should return null if all data is provided", () => {
    let mockData = { name: "abc", gameId: 1 };
    expect(validateTournament(mockData)).toBeNull();
  });
});
