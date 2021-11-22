const express = require("express");
const router = express.Router();
const postDocuments = require("../controllers/postDocuments");
const getDocuments = require("../controllers/getDocuments");

router.post("/upload", postDocuments);

router.get("/", getDocuments);

module.exports = router;
