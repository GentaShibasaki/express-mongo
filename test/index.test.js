describe("documents", () => {
  before(() => {
    console.log("Start all tests");
  });

  // Do all tests
  describe("routes/documents end point", async () => {
    require("./routes/documents/get.test");
    require("./routes/documents/post.test");
  });

  after(function () {
    console.log("Finished all tests");
  });
});
