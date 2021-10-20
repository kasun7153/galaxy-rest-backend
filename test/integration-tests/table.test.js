const request = require("supertest");
const {Table} = require("../../models/table.model");
const mongoose = require("mongoose");
let { server } = require("../../index");
let { connection } = require("../../index");
server.close();

describe("/table", () => {
  beforeEach(() => server);
  afterEach(async () => {
    server.close();
    await Table.deleteMany({});
  });
  afterAll((done) => {
    connection.close();
    done();
  });
  describe("GET /", () => {
    it("should return all tables", async () => {
      const table = [
        { seatCount: 5, status: "reserved", tableNumber: 7 },
        { seatCount: 8, status: "not reserved", tableNumber: 13 },
      ];
      await Table.collection.insertMany(table);
      const res = await request(server).get("/table");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.seatCount === 5)).toBeTruthy();
      expect(res.body.some((g) => g.status === "reserved")).toBeTruthy();
      expect(res.body.some((g) => g.tableNumber === 7)).toBeTruthy();
    });
  });
});
