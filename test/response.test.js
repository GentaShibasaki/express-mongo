const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

// Configure chai settings
chai.use(chaiHttp);
chai.should();

describe("documents", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /documents", () => {
    // Test to GET end point, for now we will get simple response
    it("should get json response for now", async () => {
      const res = await request.get("/documents");
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal({
        message:
          "This URL path is for getting up to three documetns with query string",
      });
    });
  });

  describe("POST /documents/upload", () => {
    // Test to POST end point, for now we will get simple response
    it("should get json response for now", async () => {
      const res = await request.post("/documents/upload");
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal({
        message: "This URL path is for uploading documents",
      });
    });
  });
});
