const request = require("supertest");
const app = require("../src/app");

describe("Endpoints de Authors", () => {

  test("GET /authors debe responder con status 200", async () => {
    const res = await request(app).get("/authors");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});

test("POST /authors debe crear un autor", async () => {
  const nuevoAutor = {
    name: "Test User",
    email: `test${Date.now()}@mail.com`, // 👈 evita duplicados
    bio: "Bio de prueba"
  };

  const res = await request(app)
    .post("/authors")
    .send(nuevoAutor);

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("id");
  expect(res.body.name).toBe(nuevoAutor.name);
});

email: `test${Date.now()}@mail.com`

test("POST /authors debe fallar si no hay name", async () => {
  const res = await request(app)
    .post("/authors")
    .send({
      email: "error@test.com"
    });

  expect(res.statusCode).toBe(400);
});