const express = require("express");
const router = express.Router();

router.post("/upload", (req, res) => {
  res.status(200).send({ message: "This URL path is for uploading documents" });
});

router.get("/", (req, res) => {
  res.status(200).send({
    message:
      "This URL path is for getting up to three documetns with query string",
  });
});

module.exports = router;
