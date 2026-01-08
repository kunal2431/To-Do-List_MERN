const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../server");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test("POST /tasks creates a task", async () => {
  const res = await request(app)
    .post("/tasks")
    .send({ title: "Test Task" })
    .set("Content-Type", "application/json");

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("_id");
  expect(res.body.title).toBe("Test Task");
  expect(res.body.completed).toBe(false);
});

test("DELETE /tasks/:id deletes a task", async () => {
  const created = await request(app)
    .post("/tasks")
    .send({ title: "Delete Me" })
    .set("Content-Type", "application/json");

  const id = created.body._id;

  const del = await request(app).delete(`/tasks/${id}`);
  expect(del.statusCode).toBe(200);

  const list = await request(app).get("/tasks");
  expect(list.statusCode).toBe(200);
  expect(Array.isArray(list.body)).toBe(true);
  expect(list.body.length).toBe(0);
});
