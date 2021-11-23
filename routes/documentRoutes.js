const express = require("express");
const router = express.Router();
const queue = require("../utils/asyncQueue");

// Import controllers for documents route
const postDocuments = require("../controllers/postDocuments");
const getDocuments = require("../controllers/getDocuments");

router.post("/upload", (req, res) => {
  queue.push(postDocuments(req, res), (err) => {
    if (err) {
      console.log(
        `The following error happened at postDocuments controller: ${err}`
      );
    }
  });
});

router.get("/", (req, res) => {
  queue.push(getDocuments(req, res), (err) => {
    if (err) {
      console.log(
        `The following error happened at getDocuments controller: ${err}`
      );
    }
  });
});

module.exports = router;
