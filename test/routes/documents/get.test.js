const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
const path = require("path");
const fs = require("fs");
const { doesNotMatch } = require("assert");

// Configure chai settings
chai.use(chaiHttp);
chai.should();

describe("GET test", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET test", () => {
    it("Should return 200 when there are documents in mongodb and no keyword specified", async () => {
      await request
        .post("/documents/upload")
        .field("Content-Type", "multipart/form-data")
        .attach(
          "documents",
          fs.readFileSync(
            path.join(__dirname, "../../assets/" + "test-file.pdf")
          ),
          "test-for-search-xxx.pdf"
        );
      const secondRequest = chai.request(server);
      const res = await secondRequest.get("/documents");
      res.should.have.status(200);
      res.should.be.json;
    });

    it("Should return 400 and an error message when user put keyword that is not included in documents' name", async () => {
      const res = await request.get("/documents?keyword=zzz");
      res.should.have.status(500);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal({
        message:
          "No documents found! Please change your keyword if you set or upload documents in advance",
      });
    });

    it("Should return 200 when there are documents in mongodb and keyword is included in documents' name", async () => {
      const res = await request.get("/documents?keyword=xxx"); // Use the file uploaded in previous test
      res.should.have.status(200);
      res.should.be.json;
    });
  });
});
