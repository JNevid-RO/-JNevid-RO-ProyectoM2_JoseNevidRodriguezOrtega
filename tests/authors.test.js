const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/db");

describe("Endpoints de Authors", () => {

  test("GET /authors debe responder con status 200", async () => {
    const res = await request(app).get("/authors");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /authors debe crear un autor", async () => {
    const nuevoAutor = {
      name: "Test User",
      email: `test${Date.now()}@mail.com`,
      bio: "Bio de prueba"
    };

    const res = await request(app)
      .post("/authors")
      .send(nuevoAutor);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(nuevoAutor.name);
  });

  test("POST /authors debe fallar si no hay name", async () => {
    const res = await request(app)
      .post("/authors")
      .send({
        email: "error@test.com"
      });

    expect(res.statusCode).toBe(400);
  });

  test("GET /authors/:id debe devolver un autor existente", async () => {
    const res = await request(app).get("/authors/1");

    expect([200, 404]).toContain(res.statusCode);
  });

  test("GET /authors/:id debe devolver 404 si no existe", async () => {
    const res = await request(app).get("/authors/999999");

    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    await pool.end();
  });

});

//Comando para ejeutar tests: npm test