"use strict";

const supertest = require("supertest");

const env = require("./_env");
const util = require("./_env/util");

let request;

describe("incidents-request", () => {
  beforeAll(async () => {
    const context = await env("incidentsmodel", 0);
    request = supertest(context.app);
  });

  afterAll(async () => {
    await env.end();
  });

  it("GET incidents service", async () => {
    const response = await util.callRead(request, "/v2/incidents", {
      accept: "application/json",
    });
    expect(response.body).toBeDefined();
    // ordering independent check
    expect(response.body).toEqual({ d: { EntitySets: expect.any(Array) } });
    expect(response.body.d.EntitySets.length).toBe(5);
    expect(response.body.d.EntitySets).toContain("Category");
    expect(response.body.d.EntitySets).toContain("Category_texts");
    expect(response.body.d.EntitySets).toContain("Incidents");
    expect(response.body.d.EntitySets).toContain("Priority");
    expect(response.body.d.EntitySets).toContain("Priority_texts");
  });

  it("GET incidents service data", async () => {
    const response = await util.callRead(request, "/v2/incidents/Incidents", {
      accept: "application/json",
    });
    expect(response.body).toBeDefined();
    expect(response.body.d.results.length > 0).toEqual(true);
  });
});
