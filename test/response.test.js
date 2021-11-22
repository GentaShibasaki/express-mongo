const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

// Configure chai settings
chai.use(chaiHttp);
chai.should();

describe("documents", () => {
  describe("GET /documents", () => {
    // Test to GET end point, for now we will get simple response
    it("should get json response", (done) => {
      chai
        .request(server)
        .get("/documents")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("POST /documents/upload", () => {
    // Test to POST end point, for now we will get simple response
    it("should get json response", (done) => {
      chai
        .request(server)
        .post("/documents/upload")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
