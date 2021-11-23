const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../app");
const path = require("path");
const fs = require("fs");

// Configure chai settings
chai.use(chaiHttp);
chai.should();

describe("POST test", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  it("Should return 400 and an error message when user don't create documents field in body", async () => {
    const res = await request.post("/documents/upload");
    res.should.have.status(400);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal({
      message:
        "You must create documents field in body and put least one pdf file in this field.",
    });
  });

  it("Should return 400 and an error message when user create documents field in body but doesn't attach a pdf file", async () => {
    const res = await request
      .post("/documents/upload")
      .field("Content-Type", "multipart/form-data")
      .attach("documents"); // without a document

    res.should.have.status(400);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal({
      message: "You must select at least one pdf file in documents field.",
    });
  });

  it("Should return 400 and an error message when user attach a pdf file more than 20MB", async () => {
    const res = await request
      .post("/documents/upload")
      .field("Content-Type", "multipart/form-data")
      .attach(
        "documents",
        fs.readFileSync(
          path.join(__dirname, "../../assets/" + "test-big-file.pdf")
        ),
        "test-big-file.pdf"
      );

    res.should.have.status(400);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal({
      message: "You must select a pdf file less than 20MB",
    });
  });

  it("Should return 400 and an error message when user attach more than 5 pdf files", async () => {
    const numberOfFiles = ["1", "2", "3", "4", "5", "6"];
    let requestInstance = request
      .post("/documents/upload")
      .field("Content-Type", "multipart/form-data");

    numberOfFiles.forEach((number) =>
      requestInstance.attach(
        "documents",
        fs.readFileSync(
          path.join(__dirname, "../../assets/" + "test-file.pdf")
        ),
        `test-file${number}.pdf`
      )
    );

    const res = await requestInstance;
    res.should.have.status(400);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal({
      message: "You must select less than or equal to 5 files.",
    });
  });

  it("Should return 400 and an error message when user attach pdf document in wrong field", async () => {
    const res = await request
      .post("/documents/upload")
      .field("Content-Type", "multipart/form-data")
      .attach(
        "file",
        fs.readFileSync(
          path.join(__dirname, "../../assets/" + "test-file.pdf")
        ),
        "test-file.pdf"
      );

    res.should.have.status(400);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal({
      message: "Field name for uploading documents must be 'documents'",
    });
  });

  it("Should return 200 when user attach a pdf document in documents field", async () => {
    const res = await request
      .post("/documents/upload")
      .field("Content-Type", "multipart/form-data")
      .attach(
        "documents",
        fs.readFileSync(
          path.join(__dirname, "../../assets/" + "test-file.pdf")
        ),
        "test-file.pdf"
      );

    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal({
      message: "Document have been uploaded.",
    });
  });

  it("Should return 200 when user attach multiple pdf documents in documents field", async () => {
    const numberOfFiles = ["1", "2", "3"];
    let requestInstance = request
      .post("/documents/upload")
      .field("Content-Type", "multipart/form-data");

    numberOfFiles.forEach((number) =>
      requestInstance.attach(
        "documents",
        fs.readFileSync(
          path.join(__dirname, "../../assets/" + "test-file.pdf")
        ),
        `test-file${number}.pdf`
      )
    );

    const res = await requestInstance;

    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.deep.equal({
      message: "Documents has been uploaded.",
    });
  });
});
