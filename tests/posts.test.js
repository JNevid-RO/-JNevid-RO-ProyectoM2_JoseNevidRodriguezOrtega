const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/db");

describe("Endpoints de Posts", () => {
  test("GET /posts debe responder con status 200", async () => {
    const res = await request(app).get("/posts");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /posts debe fallar si no viene title y content", async () => {
    const res = await request(app)
      .post("/posts")
      .send({ author_id: 1 });

    expect(res.statusCode).toBe(400);
  });

  test("GET /posts/:id debe devolver 404 si no existe", async () => {
    const res = await request(app).get("/posts/999999");

    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    await pool.end();
  });
});

//Comando para ejeutar tests: npm test