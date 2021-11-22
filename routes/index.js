const express = require("express");
const documentRoutes = require("./documentRoutes");

const router = express.Router();

router.use("/documents", documentRoutes);

module.exports = router;
